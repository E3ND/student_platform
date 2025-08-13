import type { Request, Response, NextFunction  } from "express";
import jwt from "jsonwebtoken";
import { getToken } from "../helpers/get-token.js";

export const verifyToken = (req: Request, res: Response, next: NextFunction ) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    const token = getToken(req);

    if(!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    try {
        const verified = jwt.verify(token, (process.env.TOKEN as string));
        req.user = verified;
        next()
    } catch (error) {
        throw res.status(401).json({ message: 'Token inválido' });
    }
}