import { CODE_CHALLENGE_URL } from "#core/config";
import knexConstructor from "knex";
import pg from "pg";
import { Knex } from "knex";
import { TODO_TABLE_NAME, TodoSchema } from "#core/schema/todo.schema";

export const db = knexConstructor({
  client: "pg",
  connection: CODE_CHALLENGE_URL,
  pool: { min: 0, max: 10 },
  acquireConnectionTimeout: 10_000,

  migrations: {
    extension: "ts",
    directory: "./src/migrations",
    loadExtensions: [".ts"],
  },
});

/**
 * Convert pg type to js type
 * https://stackoverflow.com/questions/45569216/knex-postgres-returns-strings-for-numeric-decimal-values
 * https://github.com/brianc/node-pg-types
 */
const pgTypes = pg.types;
pg.types.setTypeParser(pg.types.builtins.INT2, parseInt);
pg.types.setTypeParser(pg.types.builtins.INT4, parseInt);
pg.types.setTypeParser(pg.types.builtins.INT8, parseInt);

pgTypes.setTypeParser(pgTypes.builtins.NUMERIC, parseFloat);
pg.types.setTypeParser(pg.types.builtins.FLOAT4, parseFloat);
pg.types.setTypeParser(pg.types.builtins.FLOAT8, parseFloat);

export async function dbConnectionHealthCheck() {
  await db.raw("SELECT 1 + 1");
  console.log(`[Health-Check] Connection pool is established succesfully`);
}

export async function runMigrations() {
  /** By default, Migration lastest command will be run every time the server starts */
  const [, fileNames = []] = await db.migrate.latest();
  console.log(`[Db-Migration] ${fileNames.length} processed`);
}

declare module "knex/types/tables" {
  interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    [TODO_TABLE_NAME]: TodoSchema;
  }
}
