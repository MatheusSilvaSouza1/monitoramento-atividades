import express from 'express'
import { routers } from './routers'
import cors from 'cors'
// import './config/env'

class AppController {
    public app = express()
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes() {
        this.app.use(routers)
    }
}

export default new AppController().app