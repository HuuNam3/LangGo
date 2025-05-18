
export type UserRole = "student" | "instructor" | "admin";
export type Gender = "male" | "female" | "other";

export interface IAccountUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export interface IUserProfile {
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