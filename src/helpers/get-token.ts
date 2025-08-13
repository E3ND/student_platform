import type { Request } from "express";

// Usado para pegar o token do headers e retornar so ele
export const getToken = (req: Request) => {
    const authHeader = req.headers.authorization as string;

    const token = authHeader.split(' ')[1];

    return token;
}