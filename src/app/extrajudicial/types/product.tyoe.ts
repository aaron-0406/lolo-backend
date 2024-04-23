export type ProductType = {
  id: number;
  code: string;
  state: string;
  customerId: number;
  funcionarioId: string;
  cityId: string;
  clientId: number;
  negotiationId: number;
  customerHasBankId: number;
  extProductNameId: number;
};

export type ProductTypeName = ProductType & {
  clientName: string;
};
