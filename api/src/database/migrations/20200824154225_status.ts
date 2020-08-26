import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('status', table => {
        table.increments('id_status').primary(),
        table.string('status', 100).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('status')
}

