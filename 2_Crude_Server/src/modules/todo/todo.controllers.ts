import {
  createTodoSchema,
  deleteTodoByIdSchema,
  GetTodoByIdSchema,
  getTodoByIdSchema,
  listTodoSchema,
  todoSchema,
  updateTodoByIdSchema,
} from "#modules/todo/todo.schema";
import type { Request, Response, NextFunction } from "express";
import todoServices from "./todo.services";
import { z } from "zod";
import {
  BadRequestError,
  InternalServerError,
} from "src/middleware/error_handler.global";

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifiedBody = createTodoSchema.safeParse(req.body);

    if (verifiedBody.error)
      throw new BadRequestError(z.prettifyError(verifiedBody.error));

    const response = await todoServices.createTodo(verifiedBody.data);
    if (response.length === 0)
      throw new InternalServerError({ msg: "Cannot create todo item" });

    return res.send({ data: response[0] });
  } catch (e) {
    next(e);
  }
};

const listTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifiedQuery = listTodoSchema.safeParse(req.query);

    if (verifiedQuery.error)
      throw new BadRequestError(z.prettifyError(verifiedQuery.error));

    const response = await todoServices.listTodo(verifiedQuery.data);
    return res.send({ data: response });
  } catch (e) {
    next(e);
  }
};

const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifiedParams = getTodoByIdSchema.safeParse({
      id: Number(req.params.todoId),
    });

    if (verifiedParams.error)
      throw new BadRequestError(z.prettifyError(verifiedParams.error));

    const response = await todoServices.getTodoById(verifiedParams.data);
    return res.send({ data: response[0] || [] });
  } catch (e) {
    next(e);
  }
};

const updateTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedPayload = updateTodoByIdSchema.safeParse({
      id: Number(req.params.todoId),
      name: req.body.name,
      is_completed: req.body.is_completed,
    });

    if (verifiedPayload.error)
      throw new BadRequestError(z.prettifyError(verifiedPayload.error));

    const response = await todoServices.updateTodoById(verifiedPayload.data);
    if (response.length === 0)
      throw new InternalServerError("Record does not exists");
    return res.send({ data: response[0] });
  } catch (e) {
    next(e);
  }
};

const deleteTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedParams = deleteTodoByIdSchema.safeParse({
      id: Number(req.params.todoId),
    });

    if (verifiedParams.error)
      throw new BadRequestError(z.prettifyError(verifiedParams.error));

    const response = await todoServices.deleteTodoById(verifiedParams.data);

    if (response.length === 0)
      throw new InternalServerError("Record does not exists");

    return res.send({ data: response[0] });
  } catch (e) {
    next(e);
  }
};

export default {
  createTodo,
  listTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
