import Joi from "joi";
import { GoalType } from "../types/goal.type";

const id = Joi.number().required();
const week = Joi.number();
const startDate = Joi.date();

const createGoalSchema = Joi.object<
  Omit<GoalType, "id" | "createdAt" | "endDate" | "customerId">,
  true
>({
  startDate: startDate.required(),
  week: week.required(),
}).options({ abortEarly: true });

const updateGoalSchema = Joi.object<
  Omit<GoalType, "id" | "createdAt" | "customerId" | "endDate">,
  true
>({
  startDate: startDate.required(),
  week: week.optional(),
}).options({ abortEarly: true });

const getGoalByIdSchema = Joi.object<{ id: number }, true>({
  id,
}).options({ abortEarly: true });

export default {
  createGoalSchema,
  getGoalByIdSchema,
  updateGoalSchema,
};
