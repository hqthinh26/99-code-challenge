import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "#core/config/env.validator";
import { dbConnectionHealthCheck, runMigrations } from "#core/db/postgres";
import routes from "./routes";
import { globalErrorHandlerMiddleware } from "./middleware/error_handler.global";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(bodyParser.json({ limit: "100kb", strict: true }));

/** Setup body parser to parse req.body to JSON */
app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Powered-By", `99 Code Challenge`);
  next();
});

/** Register the api routes */
routes(app).use(globalErrorHandlerMiddleware);

(async function () {
  /** Establish database connection & run migrations */
  await dbConnectionHealthCheck().then(runMigrations);

  app.listen(3600, () => console.log(`Server is running on port ${3600}`));
})();
