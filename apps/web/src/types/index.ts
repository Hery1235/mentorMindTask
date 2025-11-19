export interface User {
  id: string;
  role: "teacher" | "admin";
  email: string;
  name: string;
  schoolId: string;
}

export interface School {
  id: string;
  name: string;
  timezone?: string;
}

export interface Class {
  id: string;
  name: string;
  schoolId: string;
  teacherId: string;
  studentCount?: number;
  assignmentCount?: number;
}

export interface Student {
  id: string;
  classId: string;
  name: string;
  email?: string;
}

export interface Assignment {
  id: string;
  classId: string;
  title: string;
  topic: string;
  dueAt: string;
  timeEstimateMin: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  scorePct: number;
  completedAt: string;
}

export interface PracticeSession {
  id: string;
  studentId: string;
  startedAt: string;
  durationMin: number;
  accuracyPct: number;
}

export interface MoodCheck {
  id: string;
  studentId: string;
  date: string;
  moodScore: number; // 1–5
}
