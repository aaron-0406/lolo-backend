import Joi from "joi";
import { ManagementActionType } from "../types/management-action.type";

const id = Joi.number();
const codeAction = Joi.string().min(1).max(10);
const nameAction = Joi.string().min(1).max(150);
const codeSubTypeManagement = Joi.string().min(1).max(10);
const customerHasBankId = Joi.number();

const page = Joi.number().required().messages({
  "number.base": "El campo page es inválido",
  "any.required": "El campo page es requerido.",
});

const limit = Joi.number().required().messages({
  "number.base": "El campo limit es inválido",
  "any.required": "El campo limit es requerido.",
});

const createManagementActionSchema = Joi.object<
  Omit<ManagementActionType, "id">,
  true
>({
  codeAction: codeAction.required(),
  nameAction: nameAction.required(),
  codeSubTypeManagement: codeSubTypeManagement.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateManagementActionSchema = Joi.object<
  Omit<ManagementActionType, "id">,
  true
>({
  codeAction: codeAction.required(),
  nameAction: nameAction.required(),
  codeSubTypeManagement: codeSubTypeManagement.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getManagementActionSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getManagementActionByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: id.required(),
});

const getManagementActionByCHBSchemaQuery = Joi.object({
  page,
  limit,
}).options({ abortEarly: true });

export default {
  createManagementActionSchema,
  updateManagementActionSchema,
  getManagementActionSchema,
  getManagementActionByCHBSchema,
  getManagementActionByCHBSchemaQuery,
};
