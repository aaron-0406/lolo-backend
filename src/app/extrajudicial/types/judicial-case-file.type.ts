export type JudicialCaseFileType = {
  id: number;
  numberCaseFile: number;
  judgmentNumber: number;
  secretary: string;
  amountDemandedSoles: number;
  cautionaryCode: string;
  errandCode:string
  judicialVenue: string;
  judge: string;
  demandDate: Date;
  createdAt: Date;
  clientId: number;
  judicialCourtId: number;
  judicialSubjectId: number;
  judicialProceduralWayId: number;
};
