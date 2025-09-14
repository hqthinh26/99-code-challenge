import express from "express";
import type { Express, NextFunction, Request, Response } from "express";

import todoControllers from "#modules/todo/todo.controllers";

const todoRouter = express.Router();

/**
 * Create a resource
 */

todoRouter.post("/api/v1/todo", todoControllers.createTodo);

/**
 * List todo with fitler by name
 */

todoRouter.get("/api/v1/todo", todoControllers.listTodo);

/**
 * Get todo details
 */
todoRouter.get("/api/v1/todo/:todoId", todoControllers.getTodoById);

/**
 * Update todo details
 */

todoRouter.put("/api/v1/todo/:todoId", todoControllers.updateTodoById);

/**
 * Delete todo details (Soft deletion)
 */
todoRouter.delete("/api/v1/todo/:todoId", todoControllers.deleteTodoById);

export default todoRouter;
