import { PrismaClient } from "../generated/prisma/index.js";

// Criando uma instacia única do PrismaClient para evitar ficar criando varias instancias
const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };