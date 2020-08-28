import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('diretoria', table => {
        table.increments('id_diretoria').primary(),
            table.string('nome', 100).notNullable(),
            table.string('sigla', 15).notNullable(),
            table.boolean('desativado').defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('diretoria')
}

