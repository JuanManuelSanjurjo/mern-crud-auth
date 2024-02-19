import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/zodValidation.middleware.js";
import { registerSchema, loginSchama } from "../zod-schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login",validateSchema(loginSchama), login);
router.post("/logout", logout);
router.post("/verify", verifyToken);
router.get("/profile", validateToken, profile);

export default router;
