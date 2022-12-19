import Joi from "joi";
import { DirectionType } from "../types/direction.type";

const id = Joi.number();
const direction = Joi.string().min(1).max(200);
const createdAt = Joi.date();
const clientID = Joi.number();

const createDirectionSchema = Joi.object<DirectionType, true>({
  id: id.required(),
  direction: direction.required(),
  createdAt: createdAt.optional(),
  clientID: clientID.required(),
});

const getDirectionSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createDirectionSchema, getDirectionSchema };