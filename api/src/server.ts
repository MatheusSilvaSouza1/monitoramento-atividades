import express from 'express'
import app from './app'
import './config/env'
const server = app

const port = process.env.PORT || 3001
console.log('RODANDO NA PORTA ' + port)
server.listen(port)