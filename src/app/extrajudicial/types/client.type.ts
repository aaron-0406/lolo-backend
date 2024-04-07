export type ClientType = {
  id: number;
  code: string;
  negotiationId: number;
  dniOrRuc?: string;
  name: string;
  salePerimeter?: string;
  phone?: string;
  email?: string;
  chbTransferred?: number;
  createdAt: Date;
  cityId: number;
  funcionarioId: number;
  customerUserId: number;
  customerHasBankId: number;
};
