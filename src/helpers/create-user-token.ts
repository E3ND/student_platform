import type { Request, Response } from "express"
import jwt from "jsonwebtoken";
import type { IToken } from "../interfaces/UserType.js";

export const createUserToken = (user: IToken, req: Request, res: Response) => {
    const tokenEnv = process.env.TOKEN as string; 
    
    const token = jwt.sign({
        id: user.id,
        name: user.name,
    }, tokenEnv)

    return res.status(200).json({ 
        error: false,
        message: "Você está autenticado", 
        token, 
    })    
}