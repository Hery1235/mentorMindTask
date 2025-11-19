MentorMind – Teacher Class Insights (MVP)

Prepared for: MentorMind Interview – 24-Hour Full-Stack Mini-Project
Date: 19/11/2025 | Prepared by: Muhammad Haris
Test Login Email: ada@school.test

Overview

MentorMind helps teachers manage classes:

Sign in (mock login)
View classes & student metrics
Create assignments

Tech Stack

Frontend: React + TS + Vite, TailwindCSS, React Query, Vitest + RTL
Backend: Node.js + TS + Express, JWT, Prisma + SQLite, Zod, Jest + Supertest
Database: SQLite (Users, Schools, Classes, Students, Assignments, Submissions, PracticeSessions, MoodChecks)

Setup
# Clone repo
git clone https://github.com/Hery1235/mentorMindTask.git
cd mentorMindTask

# Backend
cd apps/api
npm install

# Frontend
cd ../web
npm install
npm run dev

# Generate Prisma client
npx prisma generate

# Push schema
npx prisma db push

# Seed data
npx ts-node prisma/seed.ts

# Optional: Reset and reseed
npx prisma db push --force-reset
npx ts-node prisma/seed.ts


API Endpoints

POST /auth/login → JWT
GET /classes → teacher classes
GET /classes/:id/roster → students
GET /classes/:id/metrics → student KPIs
POST /assignments → create assignment

Testing

Backend: Jest 
Frontend: Vitest 

Note: Tests were written but some errors remain due to time constraints. AI was used to generate dummy data and database schemas for faster development.

CHANGELOG (Brief)

Setup backend (Node, Express, Prisma)
Setup frontend (React, Vite, Tailwind)
Implemented mock login & JWT auth
Built class list & details views
Added assignment creation
Metrics computation (student scores)
Initial tests (some errors remain)
Seeded DB with AI-assisted dummy data
