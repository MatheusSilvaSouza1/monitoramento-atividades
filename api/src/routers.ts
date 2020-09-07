import { Router } from 'express'
import { DiretoriaController } from './controller/diretoria/diretoriaController'
import CoordenadoriaController from './controller/coordenadoria/coordenadoriaController'
import ResponsavelController from './controller/responsavel/responsavelController'
import StatusController from './controller/status/statusController'
import AtividadeController from './controller/Atividades/atividadesController'
import RespondeController from './controller/responde/respondeController'
import AcaoController from './controller/acao/acaoController'
import PrioridadeController from './controller/prioridade/prioridadeController'

const routers = Router()
const diretoria = new DiretoriaController()
const coordenadoria = new CoordenadoriaController()
const responsavel = new ResponsavelController()
const status = new StatusController()
const atividade = new AtividadeController()
const responde = new RespondeController()
const prioridade = new PrioridadeController()
const acao = new AcaoController()

//! diretoria
routers.post('/diretoria', diretoria.create)
routers.get('/diretoria', diretoria.selectAll)
routers.get('/diretoria/:id_diretoria', diretoria.selectOne)
routers.put('/diretoria/:id_diretoria', diretoria.update)
routers.delete('/diretoria/:id_diretoria', diretoria.delete)
routers.post('/diretoria/:id_diretoria', diretoria.disabled)

//! coordenadoria
routers.post('/coordenadoria', coordenadoria.create)
routers.get('/coordenadoria', coordenadoria.selectAll)
routers.get('/coordenadoria/:id_coordenadoria', coordenadoria.selectOne)
routers.put('/coordenadoria/:id_coordenadoria', coordenadoria.update)
routers.delete('/coordenadoria/:id_coordenadoria', coordenadoria.delete)
routers.post('/coordenadoria/:id_coordenadoria', coordenadoria.disabled)

//! responsavel
routers.post('/responsavel', responsavel.create)
routers.get('/responsavel', responsavel.selectAll)
routers.get('/responsavel/:id_responsavel', responsavel.selectOne)
routers.put('/responsavel/:id_responsavel', responsavel.update)
routers.delete('/responsavel/:id_responsavel', responsavel.delete)
routers.post('/responsavel/:id_responsavel', responsavel.disabled)

//! status
routers.post('/status', status.create)
routers.get('/status', status.selectAll)
routers.put('/status/:id_status', status.update)
routers.delete('/status/:id_status', status.delete)

//! atividades
routers.post('/atividade', atividade.create)
routers.get('/atividade', atividade.selectAll)
routers.get('/atividade/:id_atividade', atividade.selectOne)
routers.put('/atividade/:id_atividade', atividade.update)
routers.delete('/atividade/:id_atividade', atividade.delete)

//! Responde
routers.post('/responde', responde.create)
routers.get('/responde/:fk_id_atividade', responde.selectOne)
routers.delete('/responde/:fk_id_responsavel/:fk_id_atividade', responde.delete)

//! Prioridade
routers.post('/prioridade', prioridade.create)
routers.get('/prioridade', prioridade.select)
routers.delete('/prioridade/:id_prioridade', prioridade.delete)


//! Acao
routers.post('/atividade/:fk_id_atividade/acao', acao.create)
routers.delete('/atividade/:fk_id_atividade/acao', acao.delete)


export { routers }