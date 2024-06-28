import Joi from "joi";
import { JudicialCollateralFilesType } from '../types/judicial-collateral-files.type';

const id = Joi.string();
const nameOriginAws = Joi.string();
const originalName = Joi.string();
const judicialCollateralIdJudicialCollateral = Joi.string();
const customerHasBankIdCustomerHasBank = Joi.string();

const createJudicialCollateralFilesSchema = Joi.object<
  Omit<JudicialCollateralFilesType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  nameOriginAws: nameOriginAws.required(),
  originalName: originalName.required(),
  judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
  customerHasBankIdCustomerHasBank: customerHasBankIdCustomerHasBank.required(),
});

const updateJudicialCollateralFilesSchema = Joi.object<
  Omit<JudicialCollateralFilesType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  nameOriginAws: nameOriginAws.required(),
  originalName: originalName.required(),
  judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
  customerHasBankIdCustomerHasBank: customerHasBankIdCustomerHasBank.required(),
});

const getJudicialCollateralFilesByIDSchema = Joi.object<{ id: string }, true>({
  id: id.required(),
});

const getJudicialCollateralFilesByJudicialCollateralIdSchema = Joi.object<{ judicialCollateralId: string }, true>({
  judicialCollateralId: judicialCollateralIdJudicialCollateral.required(),
});

export default {
  createJudicialCollateralFilesSchema,
  updateJudicialCollateralFilesSchema,
  getJudicialCollateralFilesByIDSchema,
  getJudicialCollateralFilesByJudicialCollateralIdSchema,
};