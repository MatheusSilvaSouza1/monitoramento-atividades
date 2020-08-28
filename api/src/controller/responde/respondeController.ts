import { Request, Response } from 'express'
import Knex from '../../database/connection'
import { IRespondeModel } from '../../models/RespondeModel'


class RespondeController {
    async create(req: Request, res: Response) {
        const responde: IRespondeModel = req.body
        const existe = await Knex('responde')
            .where('fk_id_responsavel', responde.fk_id_responsavel)
            .andWhere('fk_id_atividade', responde.fk_id_atividade)
            .first()
        if (existe) {
            return res.status(400).json({ error: 'Este responsavel já foi Atribuido a está atividade' })
        }

        const trx = await Knex.transaction()
        try {
            const result = await trx('responde').insert(responde).returning('*')
            trx.commit()
            return res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async delete(req: Request, res: Response) {
        const { fk_id_responsavel, fk_id_atividade } = req.params
        var responde = { fk_id_responsavel, fk_id_atividade }

        console.log(responde)
        const existe = await Knex('responde')
            .where('fk_id_responsavel', responde.fk_id_responsavel)
            .andWhere('fk_id_atividade', responde.fk_id_atividade)
            .first()
        if (!existe) {
            return res.status(400).json({ error: 'Não foi encontrado uma relação entre responsavel e atividade' })
        }

        const trx = await Knex.transaction()
        try {
            const result = await trx('responde')
                .where('fk_id_responsavel', responde.fk_id_responsavel)
                .andWhere('fk_id_atividade', responde.fk_id_atividade)
                .del()
            trx.commit()
            return res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }


}

export default RespondeController