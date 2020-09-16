import knex from 'knex'

const connection = knex({
    client: 'pg',
    connection: {
        host: process.env.HOST || '127.0.0.1',
        user: process.env.USER_NAME || 'postgres',
        password: process.env.PASSWORD || '12345678',
        database: process.env.DB || 'monitoramento_atividades'
    },
    useNullAsDefault: true
})

console.log(process.env.HOST,
    process.env.USER_NAME,
    process.env.PASSWORD,
    process.env.DB);


export default connection