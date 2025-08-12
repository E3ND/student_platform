export interface IStudentCreate {
    name: string;
    age: number;
    course: string;
}

export interface IStudentUpdate extends IStudentCreate {
    id: string;
}

export interface IStudentDelete {
    id: string
}