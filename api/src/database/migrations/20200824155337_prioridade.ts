import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('prioridade', table => {
        table.increments('id_prioridade').primary(),
        table.string('prioridade').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('prioridade')
}

