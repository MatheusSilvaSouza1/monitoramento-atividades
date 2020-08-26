import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('coordenadoria', table => {
        table.increments('id_coordenadoria').primary(),
        table.string('nome', 100).notNullable(),
        table.string('sigla', 15).notNullable(),
        table.boolean('desativado').defaultTo(false),
        table.integer('fk_id_diretoria').references('id_diretoria').inTable('diretoria')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('coordenadoria')
}

