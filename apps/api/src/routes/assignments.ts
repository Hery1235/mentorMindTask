import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";
import { createAssignment } from "../controllers/assignmentController";
import { z } from "zod";

const router = Router();

// Zod schema for input validation
const assignmentSchema = z.object({
  classId: z.string(),
  title: z.string(),
  topic: z.string(),
  dueAt: z.string(),
  timeEstimateMin: z.number().int(),
});

// Protected route: create a new assignment
router.post("/", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const parsed = assignmentSchema.parse(req.body);
    const assignment = await createAssignment(parsed);
    res.json(assignment);
  } catch (err) {
    next(err);
  }
});

export default router;
