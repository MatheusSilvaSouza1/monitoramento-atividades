import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('acao', table => {
        table.increments('id_acao').primary(),
            table.string('tipo').notNullable(),
            table.string('prioridade').notNullable(),
            table.integer('fk_id_atividade').references('id_atividade').inTable('atividade').notNullable(),
            table.integer('fk_id_diretoria').references('id_diretoria').inTable('diretoria').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('acao')
}

