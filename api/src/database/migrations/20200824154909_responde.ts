import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('responde', table => {
        table.integer('fk_id_responsavel').references('id_responsavel').inTable('responsavel').notNullable(),
        table.integer('fk_id_atividade').references('id_atividade').inTable('atividade').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('responde')
}

