export type ProductType = {
  id: number;
  code: string;
  name: string;
  state: string;
  clientCode: string;
  customerId: number;
  funcionarioId: string;
  cityId: string;
  negotiationId: number;
  customerHasBankId: number;
};

export type ProductTypeName = ProductType & {
  clientName: string;
};
