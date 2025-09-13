// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host: '127.0.0.1',
//       port: 3306,
//       user: 'your_database_user',
//       password: 'your_database_password',
//       database: 'myapp_test',
//     },
//   });

import { CODE_CHALLENGE_URL } from "#core/config";
import knexConstructor from "knex";
import pg from "pg";

export const db = knexConstructor({
  client: "pg",
  connection: CODE_CHALLENGE_URL,
  pool: { min: 0, max: 10 },
  acquireConnectionTimeout: 10_000,

  migrations: {
    extension: "ts",
    directory: "migrations",
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
