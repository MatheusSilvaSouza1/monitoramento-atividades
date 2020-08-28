import { Request, Response } from 'express'
import Knex from '../../database/connection'
import { ICoodenadoriaModel } from '../../models/CoordenadoriaModel'

export interface ICoordenadoria {
    coordenadoria: ICoodenadoriaModel
}

class CoordenadoriaController {

    async create(req: Request, res: Response) {
        const coordenadoria: ICoodenadoriaModel = req.body
        const trx = await Knex.transaction()

        try {
            const existe = await trx<ICoodenadoriaModel>('coordenadoria').where('sigla', coordenadoria.sigla).first()
            if (existe) {
                await trx.rollback()
                return res.status(400).json({ error: 'Está coordenadoria já foi cadastrada' })
            }
            console.log(coordenadoria)
            const result = await trx('coordenadoria').insert(coordenadoria).returning('*')
            trx.commit()
            res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }

    }

    async selectAll(req: Request, res: Response) {
        const coordenadorias = await Knex('coordenadoria')
            .innerJoin('diretoria', 'diretoria.id_diretoria', 'coordenadoria.fk_id_diretoria')
            .select(['coordenadoria.*', 'diretoria.nome as diretoria'])
        return res.json(coordenadorias).send()
    }

    async update(req: Request, res: Response) {
        const { id_coordenadoria } = req.params
        const coordenadoria: ICoodenadoriaModel = req.body
        const existe = await Knex<ICoodenadoriaModel>('coordenadoria').where('id_coordenadoria', id_coordenadoria).first()
        if (!existe) {
            return res.status(400).json({ error: 'Coordenadoria não encontrada' })
        }

        const trx = await Knex.transaction()

        try {
            console.log(coordenadoria)
            const result = await trx<ICoodenadoriaModel>('coordenadoria')
                .update(coordenadoria)
                .where('id_coordenadoria', id_coordenadoria)
                .returning('*')
            trx.commit()
            res.status(200).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }

    }

    async delete(req: Request, res: Response) {
        const { id_coordenadoria } = req.params
        const existe = await Knex<ICoodenadoriaModel>('coordenadoria').where('id_coordenadoria', id_coordenadoria).first()
        if (!existe) {
            return res.status(400).json({ error: 'Coordenadoria não encontrada' })
        }
        const trx = await Knex.transaction()
        try {
            await trx<ICoodenadoriaModel>('coordenadoria').where('id_coordenadoria', id_coordenadoria).del()
            trx.commit()
            res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }

    }

    async disabled(req: Request, res: Response) {

        const { id_coordenadoria } = req.params

        const trx = await Knex.transaction()
        const existe = await trx<ICoodenadoriaModel>('coordenadoria').where('id_coordenadoria', id_coordenadoria).first()
        if (!existe) {
            return res.status(404).json({ error: 'coordenadoria não encontrada' }).send()
        }
        try {
            existe.desativado = !existe.desativado
            await trx<ICoodenadoriaModel>('coordenadoria').update(existe).where('id_coordenadoria', parseInt(id_coordenadoria))
            trx.commit()
            return res.sendStatus(200).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }

    }

}

export default CoordenadoriaController