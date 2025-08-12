import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import type { IUser, IUserLogin } from "../interfaces/UserType.js";
import { createUserToken } from "../helpers/create-user-token.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserController {
    static async createUser(req: Request, res: Response) {
        const reqUser: IUser = req.body

        if (reqUser.name === null || typeof reqUser.name !== "string") {
            throw res.status(422).json({ error: true, message: "O campo 'name' é inválido" });
        }

        if (!reqUser.email || typeof reqUser.email !== "string") {
            throw res.status(422).json({ error: true, message: "O campo 'email' é inválido" });
        }

        if (!reqUser.password || typeof reqUser.password !== "string") {
            throw res.status(422).json({ error: true, message: "O campo 'password' é inválido" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(reqUser.password, salt);

        try {
            const userData = await prisma.user.create({
                data: {
                    name: reqUser.name,
                    email: reqUser.email,
                    password: passwordHash
                }
            })

            const data = {
                id: userData.id,
                name: userData.name
            }

            createUserToken(data, req, res);
        } catch (error) {
            throw res.status(500).json({ message: error })
        }
    }

    static async loginUser(req: Request, res: Response) {
        const reqUser: IUserLogin = req.body;

        if (reqUser.email === null || typeof reqUser.email !== "string") {
            throw res.status(422).json({ error: true, message: "O campo 'email' é inválido" });
        }

        if (!reqUser.password || typeof reqUser.password !== "string") {
            throw res.status(422).json({ error: true, message: "O campo 'password' é inválido" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: reqUser.email
            }
        });

        if(!user) {
            throw res.status(404).json({ error: true, message: "Usuário não encontrado" });
        }

        const checkPassowrd = await bcrypt.compare(reqUser.password, user.password);
    
        if(!checkPassowrd) {
            throw res.status(401).json({ error: true, message: "Senha incorreta" });
        }

        const data = {
            id: user.id,
            name: user.name
        }

        createUserToken(data, req, res);
    }
}