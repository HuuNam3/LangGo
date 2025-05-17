
// Define interfaces for type safety
export interface IAccountUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  password: string;
  email: string;
}

export interface IUserProfile {
  name: string;
  username: string;
  email: string;
  avatar: string;
  level: string;
  progress: number;
  courses: string[];
  achievements: string[];
} 