declare namespace Express {
  interface Request {
    clientIp?: string;
  }

  interface User {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    dni: string;
    email: string;
    privilege: string;
    state: boolean;
    createdAt: Date;
    customerId: number;
    roleId: number;
    permissions: Array<String>;
  }
}
