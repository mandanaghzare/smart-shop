// types/user.ts
export type User = {
  id: number;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  image: string;

  age: number;
  gender: string;

  username: string;

  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };

  company: {
    name: string;
    title: string;
  };
};