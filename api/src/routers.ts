import { Router } from 'express'
import { DiretoriaController } from './controller/diretoria/coordenadoriaController'
import CoordenadoriaController from './controller/coordenadoria/coordenadoriaController'
import ResponsavelController from './controller/responsavel/responsavelController'
import StatusController from './controller/status/statusController'

const routers = Router()
const diretoria = new DiretoriaController()
const coordenadoria = new CoordenadoriaController()
const responsavel = new ResponsavelController()
const status = new StatusController()

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

//! responsavel
routers.post('/responsavel', responsavel.create)
routers.get('/responsavel', responsavel.selectAll)
routers.put('/responsavel/:id_responsavel', responsavel.update)
routers.delete('/responsavel/:id_responsavel', responsavel.delete)
routers.post('/responsavel/:id_responsavel', responsavel.disabled)

//! status
routers.post('/status', status.create)
routers.get('/status', status.selectAll)
routers.put('/status/:id_status', status.update)
routers.delete('/status/:id_status', status.delete)


export { routers }