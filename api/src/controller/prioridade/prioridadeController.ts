import { Request, Response } from 'express'
import Knex from '../../database/connection'
import { IPrioridadeModel } from '../../models/Prioridade'

class PrioridadeController {
    async create(req: Request, res: Response) {
        const { prioridade }: IPrioridadeModel = req.body

        const existe = await Knex('prioridade').whereRaw(`unaccent(prioridade)  ilike  unaccent('%${prioridade}%')`).first()
        if (existe) {
            return res.status(400).json({ error: 'Esta prioridade já foi cadastrada' })
        }

        const trx = await Knex.transaction()
        try {
            const result = await Knex<IPrioridadeModel>('prioridade').insert({ prioridade }).returning('*')
            trx.commit()
            return res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async select(req: Request, res: Response) {
        try {
            const prioridade = await Knex<IPrioridadeModel>('prioridade').select('*')
            return res.json(prioridade)
        } catch (error) {
            return res.status(404).json({ error: `error inesperado: ${error}` })
        }
    }

    async delete(req: Request, res: Response) {
        const { id_prioridade } = req.params

        const existe = await Knex('prioridade').where('id_prioridade', id_prioridade)
        if (!existe) {
            return res.status(400).json({ error: 'Prioridade não encontrada' })
        }

        const trx = await Knex.transaction()
        try {
            await Knex<IPrioridadeModel>('prioridade').where('id_prioridade', id_prioridade).del()
            trx.commit()
            return res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }
}

export default PrioridadeController