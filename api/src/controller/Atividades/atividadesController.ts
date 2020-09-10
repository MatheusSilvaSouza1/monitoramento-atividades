import { Request, Response } from 'express'
import Knex from '../../database/connection'
import { IAtividadeModel } from '../../models/AtividadeModel'


interface IResponde {
    id_responsavel: number; responsavel: string;
}

interface IAtividade {
    id_atividade?: number
    objetivo: string
    inicio_previsto: string
    termino_previsto: string
    target: boolean
    rotina: boolean
    fk_id_status: number
    responsaveis: IResponde[]
}

class AtividadeController {

    async create(req: Request, res: Response) {
        let atividade: IAtividadeModel = req.body

        const existe = await Knex('atividade').whereRaw(`unaccent(objetivo)  ilike  unaccent('%${atividade.objetivo}%')`).first()
        if (existe) {
            return res.status(400).json({ error: 'Esta atividae já foi cadastrada' })
        }

        const trx = await Knex.transaction()
        try {
            atividade.objetivo = atividade.objetivo.trim().toUpperCase()
            atividade.inicio_previsto = atividade.inicio_previsto == "" ? undefined : atividade.inicio_previsto
            atividade.termino_previsto = atividade.termino_previsto == "" ? undefined : atividade.termino_previsto
            const result = await trx('atividade').insert(atividade).returning('*')
            trx.commit()
            return res.status(201).json(result[0]).send()
        } catch (error) {
            trx.rollback()
            return res.status(400).json({ error: `error inesperado: ${error}` })
        }
    }

    async selectAll(req: Request, res: Response) {
        try {
            const atividades: IAtividade[] = await Knex<IAtividadeModel>('atividade').select('')
                .innerJoin('status', 'status.id_status', 'atividade.fk_id_status').orderBy('atividade.id_atividade', "desc")

            for (let index = 0; index < atividades.length; index++) {
                const responsaveis = await Knex<IAtividadeModel>('responde').where('fk_id_atividade', atividades[index].id_atividade)
                    .innerJoin('responsavel', 'responde.fk_id_responsavel', 'responsavel.id_responsavel')
                    .select('responsavel.id_responsavel', 'responsavel.nome as responsavel')
                atividades[index].responsaveis = responsaveis
            }
            return res.json(atividades)
        } catch (error) {
            return res.status(404).json({ error: `error inesperado: ${error}` })
        }
    }

    async selectOne(req: Request, res: Response) {
        const { id_atividade } = req.params

        try {
            // knex('quote').select(['quote.*', knex.raw('to_json(originator.*) as originator')]).where({'quote.id': quoteId}).join('originator', {'originator.id': 'originator_id'})
            var atividade = await Knex('atividade')
                .where('id_atividade', id_atividade)
                .innerJoin('status', 'status.id_status', 'atividade.fk_id_status')
                .leftJoin('acao', 'acao.fk_id_atividade', 'atividade.id_atividade')
                .leftJoin('prioridade', 'acao.fk_id_prioridade', 'prioridade.id_prioridade')
                .leftJoin('diretoria', 'acao.fk_id_diretoria', 'diretoria.id_diretoria')
                .select('atividade.id_atividade', 'atividade.objetivo', 'atividade.inicio_previsto', 'atividade.termino_previsto', 'atividade.target', 'atividade.rotina',
                    'status.id_status', 'status.status',
                    'acao.id_acao', 'acao.tipo',
                    'diretoria.id_diretoria', 'diretoria.nome as diretoria', 'diretoria.sigla',
                    'prioridade.id_prioridade', 'prioridade.prioridade')
                .first()
            
                atividade.responsaveis = await Knex<IAtividadeModel>('responde').where('fk_id_atividade', id_atividade)
                .innerJoin('responsavel', 'responde.fk_id_responsavel', 'responsavel.id_responsavel')
                .innerJoin('coordenadoria', 'coordenadoria.id_coordenadoria', 'responsavel.fk_id_coordenadoria')
                .select('responsavel.id_responsavel', 'responsavel.nome as responsavel', 'coordenadoria.sigla as coord_sigla')
            return res.json(atividade)
        } catch (error) {
            return res.status(404).json({ error: `error inesperado: ${error}` })
        }
    }

    async update(req: Request, res: Response) {
        const { id_atividade } = req.params
        const atividade: IAtividadeModel = req.body
        const existe = await Knex('atividade').where('id_atividade', id_atividade).first()
        if (!existe) {
            return res.status(400).json({ error: 'Atividae não foi encontrada' })
        }

        if (atividade.inicio_previsto === ''){
            await delete atividade.inicio_previsto
        }
        if (atividade.termino_previsto === ''){
            await delete atividade.termino_previsto
        }

        const trx = await Knex.transaction()
        try {
            const result = await trx('atividade').where('id_atividade', id_atividade).update(atividade).returning('*')
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