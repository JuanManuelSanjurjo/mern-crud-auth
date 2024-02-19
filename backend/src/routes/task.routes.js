import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import {
  getTask,
  getTasks,
  updateTask,
  createTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/zodValidation.middleware.js";
import { createTaskSchema } from "../zod-schemas/task.schema.js";

const router = Router();

router.get("/task", validateToken, getTasks);
router.get("/task/:id", validateToken, getTask);
router.post("/task", validateToken, validateSchema(createTaskSchema), createTask);
router.put("/task/:id", validateToken, updateTask);
router.delete("/task/:id", validateToken, deleteTask);

export default router;
