import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/index.js";
import type { IToken } from "../interfaces/UserType.js";

const prisma = new PrismaClient();

//Funçãfeita para pegar o usuário pelo seu token
export const getUserByToken = async(token: string) => {
    if(!token) {
        return null;
    }

    const { id, name } = jwt.verify(token, (process.env.TOKEN as string)) as IToken

    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    return user;
}