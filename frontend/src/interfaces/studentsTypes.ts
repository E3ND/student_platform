export interface IStudent {
    id: string;
    name: string;
    age: string;
    course: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    user: {
        id: string,
        name: string
    }
}

export interface IUser {
    id: string,
    name: string,
    email: string
}