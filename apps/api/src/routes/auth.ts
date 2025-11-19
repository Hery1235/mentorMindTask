import { Router } from "express";
import { login } from "../controllers/authController";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await login(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
