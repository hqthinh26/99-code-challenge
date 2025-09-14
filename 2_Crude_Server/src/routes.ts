import type { Express } from "express";
import todoRouter from "#modules/todo/todo.routes";

export default function (app: Express) {
  app.use(todoRouter);

  return app;
}
