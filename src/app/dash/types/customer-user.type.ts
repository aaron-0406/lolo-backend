export type CustomerUserType = {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  dni: string;
  email: string;
  password: string;
  state: boolean;
  createdAt: Date;
  roleId: number;
  permissions?: Array<{
    code: string;
    link: string;
    name: string;
    icon: string;
  }>;
  subRoles: string;
  customerId: number;
  loginAttempts?: number;
  code2fa?: string;
  firstAccess: boolean;
};
