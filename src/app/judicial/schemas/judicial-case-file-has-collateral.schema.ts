import Joi from "joi";

const chb = Joi.number();
const collateralId = Joi.number();
const numberCaseFile = Joi.string();

const getAllRelatedCaseFileAssociateToCollateralSchema = Joi.object({
  chb: chb.required(),
  numberCaseFile: numberCaseFile.required(),
  collateralId: collateralId.required(),
});

const assingCollateralToCaseFileSchema = Joi.object({
  newJudicialCasefileHasCollateral : Joi.array().items(Joi.object({
    judicialCollateralId: Joi.number().required(),
    judicialCaseFileId: Joi.number().required(),
  })).required(),
});

const getCaseFileHasCollateralByIdSchema = Joi.object({
  collateralId: Joi.number().required(),
});

export default {
  getAllRelatedCaseFileAssociateToCollateralSchema,
  getCaseFileHasCollateralByIdSchema,
  assingCollateralToCaseFileSchema,
}