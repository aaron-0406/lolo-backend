export type ClientType = {
  id: number;
  code: string;
  state: string;
  dniOrRuc?: string;
  name: string;
  salePerimeter?: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  cityId: number;
  funcionarioId: number;
  customerUserId: number;
  customerHasBankId: number;
};
