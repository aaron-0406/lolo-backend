export type LoginType = {
  email: string;
  password: string;
  customerId: number;
};

export type ChangePasswordType = {
  newPassword: string;
  repeatPassword: string;
};
