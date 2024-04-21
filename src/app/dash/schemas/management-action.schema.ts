import Joi from "joi";
import { ManagementActionType } from "../types/management-action.type";

const id = Joi.number();
const codeAction = Joi.string().min(1).max(10);
const nameAction = Joi.string().min(1).max(150);
const codeSubTypeManagement = Joi.string().min(1).max(10).optional().allow("");
const customerHasBankId = Joi.number();

const createManagementActionSchema = Joi.object<
  Omit<ManagementActionType, "id">,
  true
>({
  codeAction: codeAction.required(),
  nameAction: nameAction.required(),
  codeSubTypeManagement: codeSubTypeManagement.optional(),
  customerHasBankId: customerHasBankId.required(),
});

const updateManagementActionSchema = Joi.object<
  Omit<ManagementActionType, "id">,
  true
>({
  codeAction: codeAction.required(),
  nameAction: nameAction.required(),
  codeSubTypeManagement: codeSubTypeManagement.optional(),
  customerHasBankId: customerHasBankId.required(),
});

const getManagementActionSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getManagementActionByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: id.required(),
});

export default {
  createManagementActionSchema,
  updateManagementActionSchema,
  getManagementActionSchema,
  getManagementActionByCHBSchema,
};
