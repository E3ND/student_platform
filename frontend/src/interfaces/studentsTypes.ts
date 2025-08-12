export interface IStudent {
    id: string;
    name: string;
    age: string;
    course: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}