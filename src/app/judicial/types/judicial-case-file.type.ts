export type JudicialCaseFileType = {
  id: number;
  numberCaseFile: number;
  judgmentNumber: number;
  secretary: string;
  amountDemandedSoles: number;
  amountDemandedDollars: number;
  cautionaryCode: string;
  errandCode:string
  judicialVenue: string;
  judge: string;
  demandDate: Date;
  createdAt: Date;
  clientId: number;
  customerUserId:number;
  judicialCourtId: number;
  judicialSubjectId: number;
  judicialProceduralWayId: number;
};
