import { Request, Response } from 'express'
import Knex from '../../database/connection'
import { IStatusModel } from '../../models/StatusModel'

class StatusController {

    async create(req: Request, res: Response) {
        const status: IStatusModel = req.body
        const existe = await Knex('status').whereRaw(`unaccent(status)  ilike  unaccent('%${status.status}%')`).first()
        if (existe) {
            return res.status(400).json({ error: 'Este status já foi cadastrada' })
        }
        const trx = await Knex.transaction()

        try {
            status.status = status.status.toUpperCase() 
            const result = await trx('status').insert(status).returning('*')
            trx.commit()
            return res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }

    }

    async selectAll(req: Request, res: Response) {
        const status = await Knex<IStatusModel>('status').select()
        return res.json(status)
    }

    async update(req: Request, res: Response) {
        const { id_status } = req.params
        const status: IStatusModel = req.body

        const existe = await Knex('status').where('id_status', parseInt(id_status)).first()
        if (!existe) {
            return res.status(404).json({ error: 'Status não encontrada' }).send()
        }

        const trx = await Knex.transaction()
        try {
            status.status = status.status.toUpperCase() 
            const result = await trx('status').where('id_status', id_status).update(status).returning('*')
            trx.commit()
            res.status(200).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async delete(req: Request, res: Response) {
        const { id_status } = req.params
        const existe = await Knex('status').where('id_status', parseInt(id_status)).first()
        if (!existe) {
            return res.status(404).json({ error: 'Status não encontrada' }).send()
        }
        const trx = await Knex.transaction()
        try {
            await trx('status').where('id_status', id_status).del()
            trx.commit()
            res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

}

export default StatusController