import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('atividade', table => {
        table.increments('id_atividade').primary(),
            table.string('objetivo', 255).notNullable(),
            table.date('inicio_previsto').notNullable(),
            table.boolean('target').notNullable(),
            table.boolean('rotina').comment('define se a atividade e rotineira').defaultTo(false),
            table.integer('fk_id_status').references('id_status').inTable('status')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('atividade')
}

