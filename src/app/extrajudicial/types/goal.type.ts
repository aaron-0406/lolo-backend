export type GoalType = {
  id: number;
  name: string;
  startDate: Date;
  endDate?: Date;
  week: number;
  customerId: number;
  createdAt: Date;
};
