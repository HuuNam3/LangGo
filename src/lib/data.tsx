import {hashSync } from "bcrypt"

export const accountsUser = [
  {
    id: 1,
    name: "Nam",
    username: "anhnam",
    avatar: "/images/avatar.png",
    password: hashSync("123123", 10),
    email: "nam@gmail.com"
  },
];

export const User = {
  name: "Nam",
  username: "anhnam",
  email: "nam@gmail.com",
  avatar: "/images/avatar.png",
  level: "so cap",
  progress: 0,
  courses: ["courses communicate basic"],
  achievements: ["not yet"],
};