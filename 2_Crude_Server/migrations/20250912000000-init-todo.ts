import type { Knex } from "knex";

const TABLE_NAME = "Hello";

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable(TABLE_NAME);
  if (tableExists) return;

  return await knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments("id").primary();

    table.string("name").notNullable();

    table.boolean("is_delete").defaultTo(false);
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
