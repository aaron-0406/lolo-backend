export type ProductType = {
  id: number;
  code: string;
  name: string;
  state: string;
  clientCode: string;
  customerId: number;
};

export type ProductTypeName = ProductType & {
  clientName: string;
};
