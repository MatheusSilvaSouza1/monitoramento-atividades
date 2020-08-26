import knex from 'knex'

const connection = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '12345678',
        database: 'monitoramento_atividades'
    },
    useNullAsDefault: true
})

export default connection