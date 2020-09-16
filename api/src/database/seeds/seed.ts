import knex from 'knex'

export async function seed(knex: knex) {
    await knex('diretoria').insert([
        { nome: 'DIRETORIA DE ADMINISTRAÇÃO E FINANÇAS', sigla: 'DAF' }
    ])
    await knex('coordenadoria').insert([
        { nome: 'COORDENADORIA EXECUTIVA DE TIC', sigla: 'CTIC', fk_id_diretoria: 1 }
    ])
    await knex('responsavel').insert([
        { nome: 'admin', email: 'admin', login: 'admin', senha: '$2b$08$8lP1CmuCAw.yWkx3j.s1Tul6zIVudqp6iiA/wf7e.jY8bOCSonltC', fk_id_coordenadoria: 1 }
    ])
    await knex('status').insert([
        { status: 'A INICIAR' },
        { status: 'EM EXECUÇÃO' },
        { status: 'SUSPENSA' },
        { status: 'CONCLUÍDA' }
    ])
    await knex('prioridade').insert([
        { prioridade: 'EMERGENCIAL ESTRATÉGICO' },
        { prioridade: 'EMERGENCIAL NÃO - ESTRATÉGICO' },
        { prioridade: 'ESTRATÉGICO NÃO - EMERGENCIAL' },
    ])

}