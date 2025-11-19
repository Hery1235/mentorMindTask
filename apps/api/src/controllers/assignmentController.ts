import { prisma } from "../config/prisma";

export async function createAssignment(data: {
  classId: string;
  title: string;
  topic: string;
  dueAt: string;
  timeEstimateMin: number;
}) {
  const assignment = await prisma.assignment.create({
    data: {
      classId: data.classId,
      title: data.title,
      topic: data.topic,
      dueAt: new Date(data.dueAt),
      timeEstimateMin: data.timeEstimateMin,
    },
  });
  return assignment;
}
