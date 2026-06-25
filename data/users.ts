import usersData from "./users.json";
import { User } from "@/types/user";

export const users: User[] = usersData.users.map((user) => ({
  id: user.id,

  firstName: user.firstName,
  lastName: user.lastName,

  email: user.email,
  phone: user.phone,

  image: user.image,

  age: user.age,
  gender: user.gender,

  username: user.username,

  address: {
    address: user.address.address,
    city: user.address.city,
    state: user.address.state,
    postalCode: user.address.postalCode,
  },

  company: {
    name: user.company.name,
    title: user.company.title,
  },
}));