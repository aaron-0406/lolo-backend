export type CustomerType = {
  id: number;
  ruc: string;
  companyName: string;
  urlIdentifier: string;
  description?: string;
  state: boolean;
  createdAt: Date;
  isScrapperActive: boolean;
};
