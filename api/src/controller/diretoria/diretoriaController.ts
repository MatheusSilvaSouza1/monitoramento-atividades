import { Request, Response } from 'express'
import Knex from '../../database/connection'
import { IDiretoriaModel } from '../../models/DiretoriaModel'

class DiretoriaController {

    async create(req: Request, res: Response) {

        let { nome, sigla } = req.body
        const desativado = false
        const existe = await Knex('diretoria').where('sigla', sigla).first()
        if (existe) {
            return res.status(400).json({ error: 'Está diretoria já foi cadastrada' })
        }

        const trx = await Knex.transaction()
        try {
            nome = nome.trim().toUpperCase()
            sigla = sigla.trim().toUpperCase()
            const result = await Knex<IDiretoriaModel>('diretoria').insert({ nome, sigla, desativado }).returning('*')
            trx.commit()
            return res.status(201).json(result).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }

    }

    async selectAll(req: Request, res: Response) {
        var { desativado} = req.query
        if (desativado !== undefined) {
            desativado = desativado.toString()
            const diretorias = await Knex<IDiretoriaModel>('diretoria').where('desativado', desativado).select().orderBy('id_diretoria','nome')
            return res.json(diretorias)
        }else{
            const diretorias = await Knex<IDiretoriaModel>('diretoria').select().orderBy('id_diretoria','nome')
            return res.json(diretorias)
        }
    }

    async selectOne(req: Request, res: Response) {
        const { id_diretoria } = req.params
        const diretoria = await Knex('diretoria').where('id_diretoria', id_diretoria).first()
        if(!diretoria){
            return res.status(400).json({ error: `Diretoria não encontrada` })
        }
        return res.json(diretoria)
    }

    async update(req: Request, res: Response) {
        const { id_diretoria } = req.params
        const diretoria: IDiretoriaModel = req.body
        const trx = await Knex.transaction()
        try {
            const existe = await trx<IDiretoriaModel>('diretoria').where('id_diretoria', id_diretoria).first()
            if (!existe) {
                return res.status(404).json({ error: 'Diretoria não encontrada' }).send()
            }

            const diretoriaUpdate = await trx<IDiretoriaModel>('diretoria')
                .update(diretoria)
                .where('id_diretoria', parseInt(id_diretoria))
                .returning('*')
            trx.commit()
            return res.status(200).json(diretoriaUpdate).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async delete(req: Request, res: Response) {
        const { id_diretoria } = req.params

        let diretoria = await Knex<IDiretoriaModel>('diretoria').where('id_diretoria', id_diretoria).first()
        if (!diretoria) {
            return res.status(404).json({ error: 'Diretoria não encontrada' }).send()
        }

        const trx = await Knex.transaction()
        try {

            await trx('diretoria').where('id_diretoria', id_diretoria).del()
            trx.commit()
            return res.sendStatus(200)
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async disabled(req: Request, res: Response) {
        const { id_diretoria } = req.params

        const trx = await Knex.transaction()
        try {
            const existe = await trx<IDiretoriaModel>('diretoria').where('id_diretoria', id_diretoria).first()
            if (!existe) {
                return res.status(404).json({ error: 'Diretoria não encontrada' }).send()
            }
            existe.desativado = !existe.desativado
            await trx<IDiretoriaModel>('diretoria').update(existe).where('id_diretoria', parseInt(id_diretoria))
            trx.commit()
            return res.sendStatus(200).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

}

export { DiretoriaController }