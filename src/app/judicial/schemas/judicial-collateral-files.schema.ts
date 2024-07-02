import Joi from "joi";
import { JudicialCollateralFilesType } from '../types/judicial-collateral-files.type';

const id = Joi.number();
const nameOriginAws = Joi.string();
const originalName = Joi.string();
const judicialCollateralIdJudicialCollateral = Joi.number();
const customerHasBankId = Joi.number();
const idCustomer = Joi.number();


const getJudicialCollateralFilesByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getCollateralFileByIDSchema = Joi.object<{ id: number, chb: number, collateralId: number }, true>({
  id: id.required(),
  chb: customerHasBankId.required(),
  collateralId: judicialCollateralIdJudicialCollateral.required(),
});

const getJudicialCollateralFilesByJudicialCollateralIdSchema = Joi.object<{ collateralId: number, chb: number }, true>({
  collateralId: judicialCollateralIdJudicialCollateral.required(),
  chb: customerHasBankId.required(),
});

const createJudicialCollateralFilesParamSchema = Joi.object<{ chb: number, collateralId: number }, true>({
  chb: customerHasBankId.required(),
  collateralId: judicialCollateralIdJudicialCollateral.required(),
});

export default {
  getJudicialCollateralFilesByIDSchema,
  getJudicialCollateralFilesByJudicialCollateralIdSchema,
  createJudicialCollateralFilesParamSchema,
  getCollateralFileByIDSchema
};