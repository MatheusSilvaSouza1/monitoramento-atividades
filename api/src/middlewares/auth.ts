import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({error: 'Token is required'})
    }

    const [, token] = authHeader.split(' ')

    try {
        const APP_SECRET = process.env.APP_SECRET
        await jwt.verify(token, '8e2bf4be4cbe18dea32f029aa81dcb9e' || APP_SECRET as string)
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' })
    }
}