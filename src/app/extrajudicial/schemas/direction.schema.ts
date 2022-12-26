import Joi from "joi";
import { DirectionType } from "../types/direction.type";

const id = Joi.number();
const direction = Joi.string().min(1).max(200);
const createdAt = Joi.date();
const clientId = Joi.number();

const createDirectionSchema = Joi.object<Omit<DirectionType, "id">, true>({
  direction: direction.required(),
  createdAt: createdAt.optional(),
  clientId: clientId.required(),
});

const updateDirectionSchema = Joi.object<
  Omit<DirectionType, "id" | "clientId">,
  true
>({
  direction: direction.required(),
  createdAt: createdAt.optional(),
});

const getDirectionByClientIDSchema = Joi.object<{ clientId: number }, true>({
  clientId: clientId.required(),
});

const getDirectionByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createDirectionSchema,
  updateDirectionSchema,
  getDirectionByClientIDSchema,
  getDirectionByIDSchema,
};
