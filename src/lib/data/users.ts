import { hashSync } from "bcrypt";

// Define interfaces for type safety
export interface AccountUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
  password: string;
  email: string;
}

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  avatar: string;
  level: string;
  progress: number;
  courses: string[];
  achievements: string[];
}

// Sample user accounts data
export const accountsUser: AccountUser[] = [
  {
    id: 1,
    name: "Nam",
    username: "anhnam",
    avatar: "/images/avatar.png",
    password: hashSync("123123", 10),
    email: "nam@gmail.com"
  },
];

// Sample user profile data
export const defaultUserProfile: UserProfile = {
  name: "Nam",
  username: "anhnam",
  email: "nam@gmail.com",
  avatar: "/images/avatar.png",
  level: "so cap",
  progress: 0,
  courses: [""],
  achievements: ["not yet"],
}; 