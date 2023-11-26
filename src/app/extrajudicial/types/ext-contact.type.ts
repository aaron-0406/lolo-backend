export type ExtContactType = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  state: number;
  clientId: number;
  customerHasBankId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
