import { z } from "zod";

export const TODO_TABLE_NAME = "todo";

export const todoSchema = z.object({
  id: z.number(),
  name: z.string().describe("The name of the todo task"),
  is_completed: z.preprocess((val) => {
    if (typeof val === "boolean") return val;
    if (typeof val === "string") {
      const accepted_trues = ["true", "yes", "1", ""];
      if (accepted_trues.includes(val.toLocaleLowerCase())) return true;
      return false;
    }
    if (typeof val === "number") {
      const accepted_trues = [1];
      if (accepted_trues.includes(val)) return true;
      return false;
    }
  }, z.boolean().default(false)),

  is_deleted: z.boolean().default(false),
  created_at: z.date(),
  updated_at: z.date(),
});
export type TodoSchema = z.infer<typeof todoSchema>;

export const createTodoSchema = todoSchema.pick({ name: true });
export type CreateTodoSchema = z.infer<typeof createTodoSchema>;

export const listTodoSchema = todoSchema
  .pick({
    name: true,
    is_completed: true,
  })
  .partial();
export type ListTodoSchema = z.infer<typeof listTodoSchema>;

export const getTodoByIdSchema = todoSchema.pick({ id: true });
export type GetTodoByIdSchema = z.infer<typeof getTodoByIdSchema>;

export const updateTodoByIdSchema = todoSchema
  .pick({ id: true })
  .extend(todoSchema.pick({ name: true, is_completed: true }).partial().shape);

export type UpdateTodoByIdSchema = z.infer<typeof updateTodoByIdSchema>;

export const deleteTodoByIdSchema = getTodoByIdSchema;
export type DeleteTodoByIdSchema = z.infer<typeof deleteTodoByIdSchema>;
