import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('responsavel', table => {
        table.increments('id_responsavel').primary(),
            table.string('nome', 150).notNullable(),
            table.string('login', 100).notNullable().unique(),
            table.string('senha', 150).notNullable(),
            table.boolean('desativado').defaultTo(false),
            table.integer('fk_id_coordenadoria').references('id_coordenadoria').inTable('coordenadoria').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('responsavel')
}

