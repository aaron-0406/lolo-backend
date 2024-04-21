export type ExtContactType = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  dni: string;
  state: boolean;
  clientId: number;
  customerHasBankId: number;
  extContactTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
