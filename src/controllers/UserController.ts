import type { Request, Response } from "express";
import type { IUser, IUserLogin } from "../interfaces/UserType.js";
import { createUserToken } from "../helpers/create-user-token.js";
import bcrypt from "bcrypt";
import { getUserByToken } from "../helpers/get-user-by-token.js";
import { getToken } from "../helpers/get-token.js";
import { prisma } from "../helpers/prisma.js";

export class UserController {
    static async createUser(req: Request, res: Response) {
        const reqUser: IUser = req.body

        if (reqUser.name === null || typeof reqUser.name !== "string") {
            throw res.status(422).json({ message: "O campo 'name' é inválido" });
        }

        if (!reqUser.email || typeof reqUser.email !== "string") {
            throw res.status(422).json({ message: "O campo 'email' é inválido" });
        }

        if (!reqUser.password || typeof reqUser.password !== "string") {
            throw res.status(422).json({ message: "O campo 'password' é inválido" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(reqUser.password, salt);

        const user = await prisma.user.findUnique({
            where: {
                email: reqUser.email,
            },
            select: {
                id: true,
            }
        })

        if(user) {
            throw res.status(409).json({ message: "Usuário já existe" });
        }

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
            throw res.status(422).json({ message: "O campo 'email' é inválido" });
        }

        if (!reqUser.password || typeof reqUser.password !== "string") {
            throw res.status(422).json({ message: "O campo 'password' é inválido" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: reqUser.email
            }
        });

        if(!user) {
            throw res.status(404).json({ message: "Usuário não encontrado" });
        }

        const checkPassowrd = await bcrypt.compare(reqUser.password, user.password);
    
        if(!checkPassowrd) {
            throw res.status(401).json({ message: "Senha incorreta" });
        }

        const data = {
            id: user.id,
            name: user.name
        }

        createUserToken(data, req, res);
    }

    static async getUserByToken(req: Request, res: Response) {
        const token = getToken(req) as string;

        const user = await getUserByToken(token);

        if(!user) {
            throw res.status(401).json({ message: 'Token inválido' });
        }

        return res.status(200).json({ data: user })
    }
}