import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('atividade', table => {
        table.increments('id_atividade').primary(),
            table.string('objetivo', 600).notNullable(),
            table.date('inicio_previsto'),
            table.date('termino_previsto'),
            table.boolean('target').notNullable(),
            table.boolean('rotina').comment('define se a atividade e rotineira').defaultTo(false),
            table.boolean('dasativado').defaultTo(false).notNullable(),
            table.integer('fk_id_status').references('id_status').inTable('status').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('atividade')
}

