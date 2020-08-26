import { Request, Response } from 'express'
import Knex from '../../database/connection'

export interface IResponsavelModel{
    id_responsavel?: number
    nome: string
    login: string
    senha: string
    dasativado: boolean
    fk_id_coordenadoria: number
}

class ResponsavelController{

    async create(req: Request, res:Response){
        const responsavel: IResponsavelModel = req.body
        
        const existe = await Knex<IResponsavelModel>('responsavel').where('login', responsavel.login).first()
        if(existe){
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

    async selectAll(req: Request, res:Response){

    }

    async update(req: Request, res:Response){

    }

    async delete(req: Request, res:Response){

    }

    async disabled(req: Request, res:Response){

    }

    


}

export default ResponsavelController