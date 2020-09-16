import { Request, Response } from 'express'
import Knex from '../../database/connection'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

class Login {
    async logar(req: Request, res: Response) {
        const { login, senha } = req.body

        const responsavel = await Knex('responsavel')
            .innerJoin('coordenadoria', 'coordenadoria.id_coordenadoria', 'responsavel.fk_id_coordenadoria')
            .where('login', login).andWhere('responsavel.desativado', false)
            .select(["responsavel.*", 'coordenadoria.id_coordenadoria', "coordenadoria.nome as coordenadoria", "coordenadoria.sigla"])
            .first()
        if (!responsavel) {
            return res.status(404).json({ error: 'Usuario não encontrado' })
        }

        if (await bcrypt.compare(senha, responsavel.senha)) {
            const token = await jwt.sign({ id: responsavel.id_responsavel }, '8e2bf4be4cbe18dea32f029aa81dcb9e' || process.env.APP_SECRET as string, {
                expiresIn: '1d'
            })
            const data = {
                user: {
                    id: responsavel.id_responsavel,
                    nome: responsavel.nome,
                    email: responsavel.email
                },
                coordenadoria: {
                    id_coordenadoria: responsavel.id_coordenadoria,
                    nome_coord: responsavel.coordenadoria,
                    sigla: responsavel.sigla
                },
                token
            }
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ error: 'Usuario ou senha invalido' })
        }
    }
}

export default Login