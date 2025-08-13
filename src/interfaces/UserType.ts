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

export interface IToken {
    id: string;
    name: string;
}

export interface IUser extends IUserLogin {
    name: String;
}

export interface IUserLogin {
    email: String; 
    password: String;
}