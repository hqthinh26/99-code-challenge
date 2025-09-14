import {
  CreateTodoSchema,
  DeleteTodoByIdSchema,
  GetTodoByIdSchema,
  ListTodoSchema,
  TODO_TABLE_NAME,
  UpdateTodoByIdSchema,
} from "#modules/todo/todo.schema";
import { db } from "#core/db/postgres";

const createTodo = async (data: CreateTodoSchema) => {
  return db(TODO_TABLE_NAME).insert({ name: data.name }).returning("*");
};
const listTodo = async (data: ListTodoSchema) => {
  return db(TODO_TABLE_NAME)
    .select("name", "is_completed", "is_deleted")
    .modify((builder) => {
      if (data.name) builder.whereILike("name", `%${data.name}%`);
      if (data.is_completed)
        builder.andWhere("is_completed", "=", data.is_completed);
    });
};
const getTodoById = async (data: GetTodoByIdSchema) => {
  return db(TODO_TABLE_NAME)
    .select("id", "name", "is_completed", "is_deleted")
    .where("id", "=", data.id)
    .andWhere("is_deleted", "=", false);
};

const updateTodoById = async (data: UpdateTodoByIdSchema) => {
  return db(TODO_TABLE_NAME)
    .where("id", data.id)
    .andWhere("is_deleted", false)
    .modify((builder) => {
      if (data.name) builder.update("name", data.name);
      if (typeof data.is_completed === "boolean")
        builder.update("is_completed", data.is_completed);
    })
    .returning(["id", "name", "is_completed", "is_deleted"]);
};

const deleteTodoById = async (data: DeleteTodoByIdSchema) => {
  return db(TODO_TABLE_NAME)
    .where("id", data.id)
    .update("is_deleted", true)
    .returning(["id", "name", "is_completed", "is_deleted"]);
};

export default {
  createTodo,
  listTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
