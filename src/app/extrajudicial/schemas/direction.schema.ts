import Joi from "joi";
import { DirectionType } from "../types/direction.type";

const id = Joi.number();
const direction = Joi.string().min(1).max(200);
const clientId = Joi.number();
const type = Joi.string().required().max(200);

const createDirectionSchema = Joi.object<
  Omit<DirectionType, "id" | "createdAt">,
  true
>({
  direction: direction.required(),
  clientId: clientId.required(),
  type,
});

const updateDirectionSchema = Joi.object<
  Omit<DirectionType, "id" | "clientId" | "createdAt">,
  true
>({
  direction: direction.required(),
  type,
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
