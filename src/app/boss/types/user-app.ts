export type UserAppType = {
  id: number;
  code: string;
  dni: string;
  name: string;
  lastName: string;
  address?: string;
  phone: string;
  email: string;
  password: string;
  state: boolean;
  createdAt: Date;
};
