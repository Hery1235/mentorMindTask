"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// prisma/seed.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.moodCheck.deleteMany();
    await prisma.practiceSession.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.student.deleteMany();
    await prisma.class.deleteMany();
    await prisma.user.deleteMany();
    await prisma.school.deleteMany();
    const school = await prisma.school.create({
        data: { name: "Central High" },
    });
    const teacher = await prisma.user.create({
        data: {
            name: "Ms. Ada",
            email: "ada@school.test",
            role: "teacher",
            schoolId: school.id,
        },
    });
    const classA = await prisma.class.create({
        data: { name: "Math 101", schoolId: school.id, teacherId: teacher.id },
    });
    const classB = await prisma.class.create({
        data: { name: "Physics 102", schoolId: school.id, teacherId: teacher.id },
    });
    const students = await Promise.all(["Alice", "Bob", "Carlos", "Diana", "Eve", "Frank"].map((name) => prisma.student.create({
        data: {
            name,
            classId: classA.id,
            email: `${name.toLowerCase()}@example.test`,
        },
    })));
    // Assignments for classA
    const a1 = await prisma.assignment.create({
        data: {
            classId: classA.id,
            title: "Algebra Basics",
            topic: "Algebra",
            dueAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
            timeEstimateMin: 30,
        },
    });
    const a2 = await prisma.assignment.create({
        data: {
            classId: classA.id,
            title: "Geometry Intro",
            topic: "Geometry",
            dueAt: new Date(Date.now() + 3 * 24 * 3600 * 1000),
            timeEstimateMin: 45,
        },
    });
    // Create some submissions
    await prisma.submission.createMany({
        data: students.map((s, i) => ({
            assignmentId: a1.id,
            studentId: s.id,
            scorePct: 60 + i * 5,
            completedAt: new Date(),
        })),
    });
    // practice sessions & mood checks
    const now = Date.now();
    for (const s of students) {
        await prisma.practiceSession.create({
            data: {
                studentId: s.id,
                startedAt: new Date(now - Math.floor(Math.random() * 7) * 24 * 3600 * 1000),
                durationMin: 15 + Math.floor(Math.random() * 45),
                accuracyPct: 60 + Math.random() * 35,
            },
        });
        await prisma.moodCheck.create({
            data: {
                studentId: s.id,
                date: new Date(now - Math.floor(Math.random() * 5) * 24 * 3600 * 1000),
                moodScore: 1 + Math.floor(Math.random() * 5),
            },
        });
    }
    console.log("Seeded DB with school:", school.id, "teacher:", teacher.email);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
