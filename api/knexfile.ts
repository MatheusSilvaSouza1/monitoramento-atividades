import path from 'path'

export default {
    client: 'pg',
    connection: {
        host: process.env.HOST || '127.0.0.1',
        user: process.env.USER_NAME || 'postgres',
        password: process.env.PASSWORD || '12345678',
        database: process.env.DB || 'monitoramento_atividades'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
}

