import { Request, Response } from 'express'
import Knex from '../../database/connection'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

class Login {
    async logar(req: Request, res: Response) {
        const { login, senha } = req.body

        const responsavel = await Knex('responsavel').where('login', login).first()

        if (!responsavel) {
            return res.status(404).json({ error: 'Usuario não encontrado' })
        }

        if (await bcrypt.compare(senha, responsavel.senha)) {
            const token = jwt.sign({ id: responsavel.id_responsavel }, '8e2bf4be4cbe18dea32f029aa81dcb9e', {
                expiresIn: '1d'
            })
            const data = {
                id: responsavel.id_responsavel,
                nome: responsavel.nome,
                email: responsavel.email,
                token
            }
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ error: 'Usuario ou senha invalido' })
        }
    }
}

export default Login