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
  cityID: number;
  funcionarioID: number;
  customerUserID: number;
  customerID: number;
  bankID: number;
};
