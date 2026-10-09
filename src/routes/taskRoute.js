import { Router } from "express";
import {
    createTaskSchema,
    taskQuerySchema,
    updateTaskSchema,
} from "../validators/task.validator.js";
import {
    getTasks,
    deleteTaskById,
    newTask,
    updatetaskById,
    taskById,
} from "../controller/task.controller.js";
import { validate } from '../middleware/validate.js'

const taskRoutes = Router();

taskRoutes.get("/", validate(taskQuerySchema, "query") , getTasks);

taskRoutes.get("/:id", taskById);

taskRoutes.post("/", validate(createTaskSchema), newTask);

taskRoutes.put("/:id", validate(updateTaskSchema), updatetaskById);

taskRoutes.delete("/:id", deleteTaskById);

export { taskRoutes };
