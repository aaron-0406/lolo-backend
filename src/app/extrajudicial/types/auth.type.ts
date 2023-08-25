export type LoginType = {
  email: string;
  password: string;
  customerId: number;
};

export type ChangePasswordType = {
  newPassword: string;
  repeatPassword: string;
};

export type ChangeCredentialsType = {
  name: string;
  lastname: string;
  dni: string;
  phone: string;
};
