import { TODO_TABLE_NAME } from "#core/schema/todo.schema";
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable(TODO_TABLE_NAME);
  if (tableExists) return;

  return await knex.schema.createTable(TODO_TABLE_NAME, function (table) {
    table.increments("id").primary();

    table.string("name").notNullable();
    table.boolean("is_completed").defaultTo(false);

    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TODO_TABLE_NAME);
}
