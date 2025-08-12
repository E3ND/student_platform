import type { Request } from "express";

export const getToken = (req: Request) => {
    const authHeader = req.headers.authorization as string;

    const token = authHeader.split(' ')[1];

    return token;
}