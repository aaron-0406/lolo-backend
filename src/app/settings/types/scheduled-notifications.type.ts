export type ScheduledNotificationType = {
  id: number;
  nameNotification: string;
  descriptionNotification: string;
  frequencyToNotify: number;
  hourTimeToNotify: Date;
  customerHasBankId: number;
  logicKey: string;
  daysToNotify: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
