import Joi from "joi";
import { GoalType } from "../types/goal.type";

const id = Joi.number().required();
const name = Joi.string();
const week = Joi.number().positive();
const startDate = Joi.date();

const limit = Joi.number().required();
const page = Joi.number().required();

const getGoalQuerySchema = Joi.object({
  limit,
  page,
}).options({ abortEarly: true });

const createGoalSchema = Joi.object<
  Omit<GoalType, "id" | "createdAt" | "endDate" | "customerId">,
  true
>({
  name: name.required(),
  startDate: startDate.required(),
  week: week.required(),
}).options({ abortEarly: true });

const updateGoalSchema = Joi.object<
  Omit<GoalType, "id" | "createdAt" | "customerId" | "endDate">,
  true
>({
  name: name.required(),
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
  getGoalQuerySchema,
};
