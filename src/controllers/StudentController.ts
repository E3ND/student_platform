import type { Request, Response } from "express";
import type { IStudentCreate, IStudentDelete, IStudentUpdate } from "../interfaces/UserType.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { getToken } from "../helpers/get-token.js";
import { getUserByToken } from "../helpers/get-user-by-token.js";

const prisma = new PrismaClient();

export class StudentController {
    static async findAllStudents(req: Request, res: Response) {
        const students = await prisma.student.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if(students.length === 0) throw res.status(201).json({ data: "Nenhum estudante cadastrado" });

        res.status(200).json({ data: students });
    }

    static async createStudent(req: Request, res: Response) {
        const reqStudent: IStudentCreate = req.body

        if (reqStudent.name === null || typeof reqStudent.name !== "string") {
            throw res.status(422).json({ message: "O campo 'nome' é inválido" });
        }

        if (!reqStudent.age || typeof reqStudent.age !== "number") {
            throw res.status(422).json({ message: "O campo 'age' é inválido" });
        }

        if (!reqStudent.course || typeof reqStudent.course !== "string") {
            throw res.status(422).json({ message: "O campo 'course' é inválido" });
        }

        const token = getToken(req) as string;
        const user = await getUserByToken(token);

        if(!user) {
            throw res.status(401).json({ message: "Usuário não autenticado" });
        }

        try {
            await prisma.student.create({
                data: {
                    name: reqStudent.name,
                    age: reqStudent.age,
                    course: reqStudent.course,
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            });

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
        } catch (error) {
            throw res.status(500).json({ message: error })
        }
     }

     static async updateStudent(req: Request, res: Response) {
        const reqStudent: IStudentUpdate = req.body;

        if (reqStudent.id === null || typeof reqStudent.id !== "string") {
            throw res.status(422).json({ message: "O campo 'id' é inválido" });
        }

        if (reqStudent.name === null || typeof reqStudent.name !== "string") {
            throw res.status(422).json({ message: "O campo 'nome' é inválido" });
        }

        if (!reqStudent.age || typeof reqStudent.age !== "number") {
            throw res.status(422).json({ message: "O campo 'age' é inválido" });
        }

        if (!reqStudent.course || typeof reqStudent.course !== "string") {
            throw res.status(422).json({ message: "O campo 'course' é inválido" });
        }

        const student = await prisma.student.findUnique({
            where: {
                id: reqStudent.id,
                deletedAt: null
            },
            include: {
                user: {
                    select: {
                        id: true
                    }
                }
            }
        });

        if(student === null) {
            throw res.status(404).json({ message: 'Estudante não encontrado' })
        }

        const token = getToken(req) as string;
        const user = await getUserByToken(token);

        if(!user) {
            throw res.status(401).json({ message: "Usuário não autenticado" });
        }

        if(user.id !== student.user.id) {
            throw res.status(401).json({ message: "Não autorizado" });
        }

        try {
            await prisma.student.update({
                where: {
                    id: reqStudent.id,
                    deletedAt: null
                },
                data: {
                    name: reqStudent.name,
                    age: reqStudent.age,
                    course: reqStudent.course
                }
            })

            return res.status(200).json({ message: 'Estudante atualizado com sucesso' })
        } catch (error) {
            throw res.status(500).json({ message: error })
        }
     }

     static async deleteStudent(req: Request, res: Response) {
        const { id }: IStudentDelete = req.params as any;

        if (id === null || typeof id !== "string") {
            throw res.status(422).json({ message: "O campo 'id' é inválido" });
        }

        const student = await prisma.student.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
            include: {
                user: {
                    select: {
                        id: true
                    }
                }
            }
        });

        if(student === null) {
            throw res.status(404).json({ message: 'Estudante não encontrado' })
        }

        const token = getToken(req) as string;
        const user = await getUserByToken(token);

        if(!user) {
            throw res.status(401).json({ message: "Usuário não autenticado" });
        }

        if(user.id !== student.user.id) {
            throw res.status(401).json({ message: "Não autorizado" });
        }

        try {
            await prisma.student.update({
                where: {
                    id: id,
                    deletedAt: null,
                },
                data: {
                    deletedAt: new Date(Date.now())
                }
            })

            return res.status(200).json({ message: 'Estudante deletado com sucesso' })
        } catch (error) {
            throw res.status(500).json({ message: error })
        }
     }
}