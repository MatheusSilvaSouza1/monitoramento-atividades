import express from 'express'
import cors from 'cors'
import { routers } from './routers'

const server = express()

server.use(express.json())
server.use(cors())
server.use(routers)

const port = process.env.PORT || 3001
console.log('RODANDO NA PORTA ' + port)
server.listen(port)