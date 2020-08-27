import { Request, Response } from 'express'
import Knex from '../../database/connection'

export interface IResponsavelModel {
    id_responsavel?: number
    nome: string
    login: string
    senha: string
    desativado: boolean
    fk_id_coordenadoria: number
}

class ResponsavelController {

    async create(req: Request, res: Response) {
        const responsavel: IResponsavelModel = req.body

        const existe = await Knex<IResponsavelModel>('responsavel').where('login', responsavel.login).first()
        if (existe) {
            return res.status(400).json({ error: 'Este responsavel já foi cadastrada' })
        }

        const trx = await Knex.transaction()
        try {
            await trx('responsavel').insert(responsavel)
            trx.commit()
            return res.status(201).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async selectAll(req: Request, res: Response) {
        const responsaveis = await Knex<IResponsavelModel>('responsavel')
            .leftJoin('coordenadoria', 'coordenadoria.id_coordenadoria', 'responsavel.fk_id_coordenadoria')
            .innerJoin('diretoria', 'diretoria.id_diretoria', 'coordenadoria.fk_id_diretoria')
            .select([
                'responsavel.id_responsavel', 'responsavel.nome', 'responsavel.login', 'responsavel.desativado as resp_desativado',
                'coordenadoria.id_coordenadoria', 'coordenadoria.nome as coordenadoria', 'coordenadoria.sigla as coord_sigla', 'coordenadoria.desativado as coord_dasativado',
                'diretoria.id_diretoria', 'diretoria.nome as diretoria', 'diretoria.sigla as dir_sigla', 'diretoria.desativado as dir_dasativado'
            ])
        return res.json(responsaveis).send()
    }

    async update(req: Request, res: Response) {
        const { id_responsavel } = req.params
        const responsavel: IResponsavelModel = req.body

        const existe = await Knex<IResponsavelModel>('responsavel').where('id_responsavel', id_responsavel).first()
        if (!existe) {
            return res.status(400).json({ error: 'Usuario não encontrado' })
        }

        const trx = await Knex.transaction()
        try {
            await trx('responsavel').update(responsavel).where('id_responsavel', id_responsavel)
            trx.commit()
            res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async delete(req: Request, res: Response) {
        const { id_responsavel } = req.params

        const existe = await Knex<IResponsavelModel>('responsavel').where('id_responsavel', id_responsavel).first()
        if (!existe) {
            return res.status(400).json({ error: 'Usuario não encontrado' })
        }
        const trx = await Knex.transaction()

        try {
            await trx('responsavel').where('id_responsavel', id_responsavel).del()
            trx.commit()
            res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async disabled(req: Request, res: Response) {
        const { id_responsavel } = req.params
        const existe = await Knex('responsavel').select().where('id_responsavel', parseInt(id_responsavel)).first()
        if (!existe) {
            return res.status(400).json({ error: 'Responsavel não encontrado' })
        }
        const trx = await Knex.transaction()
        try {
            existe.desativado = !existe.desativado
            await trx('responsavel').where('id_responsavel', parseInt(id_responsavel)).update(existe)
            trx.commit()
            res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

}

export default ResponsavelController