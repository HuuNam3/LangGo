// import { IAccountUser } from "./users";

export interface ILesson {
    _id: string;
    title: string;
    image: string;
    // instructor: IAccountUser;
    instructor: string;
    description: string;
    duration: number;
    level: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICourse {
    _id: string;
    title: string;
    description: string;
    lessons: ILesson[];
    createdAt: Date;
    updatedAt: Date;
}