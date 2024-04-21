export type ProductType = {
  id: number;
  code: string;
  name: string;
  state: string;
  customerId: number;
  funcionarioId: string;
  cityId: string;
  clientId: number;
  negotiationId: number;
  customerHasBankId: number;
};

export type ProductTypeName = ProductType & {
  clientName: string;
};
