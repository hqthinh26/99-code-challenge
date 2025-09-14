import { CreateTodoSchema, TODO_TABLE_NAME } from "#core/schema/todo.schema";
import { db } from "#core/db/postgres";

const createTodo = async (data: CreateTodoSchema) => {
  return db(TODO_TABLE_NAME).insert({ name: data.name }).returning("*");
};
const listTodo = () => {};
const getTodo = () => {};
const updateTodo = () => {};
const deleteTodo = () => {};

export default { createTodo };
