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
  name: string;
  avatarUrl?: string;
  bio?: string;
  joined: Date;
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
  studied: string;
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

export interface ILesson {
  _id: string;
  name: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILessonContent {
  _id: string;
  lesson_id:string;
  type: "video" | "text" | "quiz" | "audio";
  content_id: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMyCourses {
  _id: string;
  user_id: string;
  course_id: string;
  course: ICourse;
  enrolled_at: Date;
  createdAt: Date;
  updatedAt: Date;
  progress: number;
}

export interface ICourseCatygory {
  _id: string;
  title: string;
  description: string;
  courses: ICourse[];
  createdAt: Date;
  updatedAt: Date;
}
