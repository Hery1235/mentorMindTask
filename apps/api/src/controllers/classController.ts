import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/authMiddleware";

/**
 * Get all classes for the authenticated teacher
 */
export async function getClasses(req: AuthRequest) {
  const teacherId = req.user!.userId;

  const classes = await prisma.class.findMany({
    where: { teacherId },
    include: {
      students: true,
      assignments: true,
    },
  });

  return classes.map((c: any) => ({
    id: c.id,
    name: c.name,
    studentCount: c.students.length,
    assignmentCount: c.assignments.length,
  }));
}

/**
 * Get roster of students in a class
 */
export async function getRoster(classId: string, user: any) {
  // Check teacher owns this class
  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: { students: true },
  });

  if (!cls) throw new Error("Class not found");
  if (cls.teacherId !== user.userId) throw new Error("Access denied");

  return cls.students.map((s: any) => ({
    id: s.id,
    name: s.name,
    email: s.email || "",
  }));
}

/**
 * Compute key metrics for each student in a class
 */
export async function getMetrics(classId: string, user: any) {
  // Check teacher owns this class
  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: { students: true },
  });

  if (!cls) throw new Error("Class not found");
  if (cls.teacherId !== user.userId) throw new Error("Access denied");

  const metrics = await Promise.all(
    cls.students.map(async (s: any) => {
      // Average score from submissions
      const submissions = await prisma.submission.findMany({
        where: { studentId: s.id },
      });
      const avgScore =
        submissions.length > 0
          ? submissions.reduce(
              (sum: any, sub: any) => sum + (sub.scorePct || 0),
              0
            ) / submissions.length
          : null;

      // Sessions this week
      const now = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      const sessions = await prisma.practiceSession.findMany({
        where: {
          studentId: s.id,
          startedAt: { gte: weekAgo },
        },
      });
      const avgAccuracy =
        sessions.length > 0
          ? sessions.reduce((sum: any, s: any) => sum + s.accuracyPct, 0) /
            sessions.length
          : null;

      // Last mood check
      const moodCheck = await prisma.moodCheck.findFirst({
        where: { studentId: s.id },
        orderBy: { date: "desc" },
      });

      return {
        studentId: s.id,
        studentName: s.name,
        avgScorePct: avgScore,
        sessionsThisWeek: sessions.length,
        avgAccuracyPct: avgAccuracy,
        recentMood: moodCheck?.moodScore || null,
      };
    })
  );

  return metrics;
}
