import { z } from "zod";

export const TODO_TABLE_NAME = "todo";

export const todoSchema = z.object({
  name: z.string().describe("The name of the todo task"),
  is_completed: z.boolean().default(false),

  is_deleted: z.boolean().default(false),
  created_at: z.date(),
  updated_at: z.date(),
});
export type TodoSchema = z.infer<typeof todoSchema>;

export const createTodoSchema = todoSchema.pick({ name: true });
export type CreateTodoSchema = z.infer<typeof createTodoSchema>;