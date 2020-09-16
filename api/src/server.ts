import express from 'express'
import app from './app'

const server = app

const port = process.env.PORT || 3001
console.log('RODANDO NA PORTA ' + port)

server.listen(port)