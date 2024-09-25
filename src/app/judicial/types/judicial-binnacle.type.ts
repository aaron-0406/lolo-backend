export type JudicialBinnacleType = {
  id: number;
  judicialBinProceduralStageId: number;
  lastPerformed: string;
  binnacleTypeId: number;
  date: Date;
  judicialFileCaseId: number;
  customerHasBankId: number;

  index: number;
  resolutionDate: Date;
  entryDate: Date;
  notificationType: string;
  acto: string;
  fojas: number;
  folios: number;
  provedioDate: Date;
  userDescription: string;
  createdBy: number;

  totalTariff: number;
  tariffHistory: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
