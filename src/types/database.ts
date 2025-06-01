export type UserRole = "student" | "instructor" | "admin";
export type Gender = "male" | "female" | "other";

export interface IUserAccounts {
  _id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export interface IUserInformation {
  _id: string;
  userId: string; 
  avatarUrl?: string;
  birthday?: Date;
  gender?: Gender;
  phoneNumber?: string;
  country?: string;
  createdAt: Date;
  updatedAt?: Date;
} 

export interface IIntroduction {
  _id: string;
  description: string;
  you_learn: string[];
  prerequisites: string;
  courses_id: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ICourse {
    _id: string;
    name: string;
    thumbnail: string;
    // instructor: IAccountUser;
    instructor: string;
    language: string;
    duration: number;
    level: string;
    introduction: IIntroduction;
    category: string;
    slug: string;
    course_categories_name: string;
    order: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICourseCatygory {
    _id: string;
    title: string;
    description: string;
    courses: ICourse[];
    createdAt: Date;
    updatedAt: Date;
}