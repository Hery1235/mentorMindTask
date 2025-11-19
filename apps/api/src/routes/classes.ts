import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";
import {
  getClasses,
  getRoster,
  getMetrics,
} from "../controllers/classController";

const router = Router();

// Protected route: get all classes for the authenticated teacher
router.get("/", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const classes = await getClasses(req);
    res.json(classes);
  } catch (err) {
    next(err);
  }
});

// Class roster
router.get(
  "/:id/roster",
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const roster = await getRoster(req.params.id, req.user!);
      res.json(roster);
    } catch (err) {
      next(err);
    }
  }
);

// Class metrics
router.get(
  "/:id/metrics",
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const metrics = await getMetrics(req.params.id, req.user!);
      res.json(metrics);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
