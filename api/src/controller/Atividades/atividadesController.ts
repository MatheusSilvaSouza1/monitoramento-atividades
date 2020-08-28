import { Request, Response } from 'express'
import Knex from '../../database/connection'
import { IAtividadeModel } from '../../models/AtividadeModel'

class AtividadeController {

    async create(req: Request, res: Response) {
        const atividade: IAtividadeModel = req.body

        const existe = await Knex('atividade').whereRaw(`unaccent(objetivo)  ilike  unaccent('%${atividade.objetivo}%')`).first()
        if (existe) {
            return res.status(400).json({ error: 'Esta atividae já foi cadastrada' })
        }

        const trx = await Knex.transaction()
        try {
            const result = await trx('atividade').insert(atividade).returning('*')
            trx.commit()
            return res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async selectAll(req: Request, res: Response) {
        const atividades = await Knex<IAtividadeModel>('atividade')
            .leftJoin('responde', 'atividade.id_atividade', 'responde.fk_id_atividade')
            .leftJoin('responsavel', 'responsavel.id_responsavel', 'responde.fk_id_responsavel')
            .innerJoin('status', 'atividade.fk_id_status', 'status.id_status')
            .select([
                'atividade.id_atividade', 'atividade.objetivo', 'atividade.inicio_previsto', 'atividade.target', 'atividade.rotina', 'atividade.termino_previsto',
                'status.status',
                'responsavel.id_responsavel', 'responsavel.nome as responsavel', 'responsavel.login', 'responsavel.desativado'
            ])
        return res.json(atividades)
    }

    async update(req: Request, res: Response) {
        const { id_atividade } = req.params
        const atividade: IAtividadeModel = req.body

        const existe = await Knex('atividade').where('id_atividade', id_atividade).first()
        if (!existe) {
            return res.status(400).json({ error: 'Atividae não foi encontrada' })
        }

        const trx = await Knex.transaction()
        try {
            const result = await trx('atividade').where('id_atividade', id_atividade).update(atividade)
            trx.commit()
            return res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async delete(req: Request, res: Response) {
        const { id_atividade } = req.params

        const existe = await Knex('atividade').where('id_atividade', id_atividade).first()
        if (!existe) {
            return res.status(400).json({ error: 'Atividae não foi encontrada' })
        }

        const trx = await Knex.transaction()
        try {
            const result = await trx('atividade').where('id_atividade', id_atividade).del()
            trx.commit()
            return res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }


}

export default AtividadeController