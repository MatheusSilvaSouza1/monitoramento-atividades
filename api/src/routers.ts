import { Router, Request, Response } from 'express'
import { DiretoriaController } from './controller/diretoria/coordenadoriaController'
import CoordenadoriaController from './controller/coordenadoria/coordenadoriaController'
import ResponsavelController from './controller/responsavel/responsavelController'

const routers = Router()
const diretoria = new DiretoriaController()
const coordenadoria = new CoordenadoriaController()
const responsavel = new ResponsavelController()

//! diretoria
routers.post('/diretoria', diretoria.create)
routers.get('/diretoria', diretoria.selectAll)
routers.put('/diretoria/:id_diretoria', diretoria.update)
routers.delete('/diretoria/:id_diretoria', diretoria.delete)
routers.post('/diretoria/:id_diretoria', diretoria.disabled)

//! coordenadoria
routers.post('/coordenadoria', coordenadoria.create)
routers.get('/coordenadoria', coordenadoria.selectAll)
routers.put('/coordenadoria/:id_coordenadoria', coordenadoria.update)
routers.delete('/coordenadoria/:id_coordenadoria', coordenadoria.delete)
routers.post('/coordenadoria/:id_coordenadoria', coordenadoria.disabled)

//!responsavel
routers.post('/responsavel', responsavel.create)
routers.get('/responsavel', responsavel.selectAll)
routers.put('/responsavel/:id_responsavel', responsavel.update)
routers.delete('/responsavel/:id_responsavel', responsavel.delete)
routers.post('/responsavel/:id_responsavel', responsavel.disabled)


export { routers }