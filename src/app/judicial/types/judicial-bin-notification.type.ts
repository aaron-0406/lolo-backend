export type JudicialBinNotificationType = {
  id: number;
  notificationCode: number;
  addressee: string;
  shipDate: string;
  attachments: string;
  deliveryMethod: string;
  resolutionDate: Date;
  notificationPrint: string;
  sentCentral: string;
  centralReceipt: string;
  notificationToRecipientOn: string;
  chargeReturnedToCourtOn: string;
  idJudicialBinacle: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};