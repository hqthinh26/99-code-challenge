import { createTodoSchema, todoSchema } from "#core/schema/todo.schema";
import type { Request, Response, NextFunction } from "express";
import todoServices from "./todo.services";
import { z } from "zod";
import { BadRequestError } from "src/middleware/error_handler.global";

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifiedBody = createTodoSchema.safeParse(req.body);

    if (verifiedBody.error)
      throw new BadRequestError(z.prettifyError(verifiedBody.error));

    const response = await todoServices.createTodo(verifiedBody.data);

    return res.send({
      data: response[0] || null,
    });
  } catch (e) {
    next(e);
  }
};

const listTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    next(e);
  }
};

const getTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    next(e);
  }
};

const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    next(e);
  }
};

const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    next(e);
  }
};

export default {
  createTodo,
  listTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
