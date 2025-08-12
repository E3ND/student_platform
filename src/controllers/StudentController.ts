import type { Request, Response } from "express";
import type { IStudentCreate, IStudentDelete, IStudentUpdate } from "../interfaces/UserType.js";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export class StudentController {
    static async findAllStudents(req: Request, res: Response) {
        const students = await prisma.student.findMany({
            where: {
                deletedAt: null
            }
        });

        if(students.length === 0) return  res.status(201).json({ data: "Nenhum estudante cadastrado" });

        res.status(200).json({ data: students });
    }

    static async createStudent(req: Request, res: Response) {
        const reqStudent: IStudentCreate = req.body

        if (reqStudent.name === null || typeof reqStudent.name !== "string") {
            return res.status(422).json({ message: "O campo 'nome' é inválido" });
        }

        if (!reqStudent.age || typeof reqStudent.age !== "number") {
            return res.status(422).json({ message: "O campo 'age' é inválido" });
        }

        if (!reqStudent.course || typeof reqStudent.course !== "string") {
            return res.status(422).json({ message: "O campo 'course' é inválido" });
        }

        try {
            await prisma.student.create({
                data: {
                    name: reqStudent.name,
                    age: reqStudent.age,
                    course: reqStudent.course
                }
            });

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
        } catch (error) {
            return res.status(500).json({ message: error })
        }
     }

     static async updateStudent(req: Request, res: Response) {
        const reqStudent: IStudentUpdate = req.body;

        if (reqStudent.id === null || typeof reqStudent.id !== "string") {
            return res.status(422).json({ message: "O campo 'id' é inválido" });
        }

        if (reqStudent.name === null || typeof reqStudent.name !== "string") {
            return res.status(422).json({ message: "O campo 'nome' é inválido" });
        }

        if (!reqStudent.age || typeof reqStudent.age !== "number") {
            return res.status(422).json({ message: "O campo 'age' é inválido" });
        }

        if (!reqStudent.course || typeof reqStudent.course !== "string") {
            return res.status(422).json({ message: "O campo 'course' é inválido" });
        }

        const student = await prisma.student.findUnique({
            where: {
                id: reqStudent.id,
                deletedAt: null
            }
        });

        if(student === null) {
            return res.status(404).json({ message: 'Estudante não encontrado' })
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
            return res.status(500).json({ message: error })
        }
     }

     static async deleteStudent(req: Request, res: Response) {
        const { id }: IStudentDelete = req.params as any;

        if (id === null || typeof id !== "string") {
            return res.status(422).json({ message: "O campo 'id' é inválido" });
        }

        const student = await prisma.student.findUnique({
            where: {
                id: id,
                deletedAt: null
            }
        });

        if(student === null) {
            return res.status(404).json({ message: 'Estudante não encontrado' })
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
            return res.status(500).json({ message: error })
        }
     }
}