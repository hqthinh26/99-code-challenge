import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import '#core/config/env.validator';
import { dbConnectionHealthCheck, runMigrations } from "#core/db/postgres";

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

(async function () {
  /** Establish database connection & run migrations */
  await dbConnectionHealthCheck().then(runMigrations);
})();
