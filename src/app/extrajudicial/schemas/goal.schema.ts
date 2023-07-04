import Joi from "joi";
import { GoalType } from "../types/goal.type";

const id = Joi.number();
const week = Joi.number();
const endDate = Joi.date();
const startDate = Joi.date();
const customerId = Joi.number();

const createGoalSchema = Joi.object<
  Omit<GoalType, "id" | "createdAt" | "endDate" | "customerId">,
  true
>({
  startDate,
  week,
});

const updateGoalSchema = Joi.object<
  Omit<GoalType, "id" | "createdAt" | "customerId" | "endDate">,
  true
>({
  startDate: startDate.required(),
  week: week.optional(),
});

const getGoalByIdSchema = Joi.object<{ id: number }, true>({
  id,
});

export default {
  createGoalSchema,
  getGoalByIdSchema,
  updateGoalSchema,
};
