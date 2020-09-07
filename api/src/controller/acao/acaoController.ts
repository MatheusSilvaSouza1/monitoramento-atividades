import { Request, Response } from 'express'
import Knex from '../../database/connection'
import { IAcaoModel } from '../../models/AcaoModel'



class AcaoController {


    async create(req: Request, res: Response) {
        const { fk_id_atividade } = req.params
        let acao: IAcaoModel = req.body

        const existe = await Knex('acao').where('fk_id_atividade', fk_id_atividade).first()
        if (existe) {
            return res.status(404).json({ error: 'Uma ação já foi vinculada a esta atividade' }).send()
        }

        const trx = await Knex.transaction()
        try {
            acao.fk_id_atividade = parseInt(fk_id_atividade)
            acao.tipo = acao.tipo.trim().toUpperCase()
            acao.prioridade = acao.prioridade.trim().toUpperCase()
            const result = await trx('acao').insert(acao).returning('*')
            trx.commit()
            return res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }


    async delete(req: Request, res: Response) {
        const { fk_id_atividade } = req.params

        const existe = await Knex('acao').where('fk_id_atividade', fk_id_atividade).first()
        if (!existe) {
            return res.status(404).json({ error: 'Não foi encontrada uma ação para está atividade' }).send()
        }

        const trx = await Knex.transaction()
        try {
            
            const result = await trx('acao').where('fk_id_atividade', fk_id_atividade).del()
            trx.commit()
            return res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }


}

export default AcaoController