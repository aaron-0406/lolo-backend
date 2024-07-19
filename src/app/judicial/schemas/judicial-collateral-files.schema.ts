import Joi from "joi";

const id = Joi.number();
const judicialCollateralIdJudicialCollateral = Joi.number();
const customerHasBankId = Joi.number();
const filter = Joi.string().optional().messages({
  "string.base": "El campo filter es inválido",
  "any.required": "El campo filter es requerido.",
  "string.empty": "El campo filter no puede estar vácio",
});

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

const getJudicialCaseFileByCHBSchemaQuery = Joi.object({
  filter,
}).options({ abortEarly: true });

export default {
  getJudicialCollateralFilesByIDSchema,
  getJudicialCollateralFilesByJudicialCollateralIdSchema,
  createJudicialCollateralFilesParamSchema,
  getCollateralFileByIDSchema,
  getJudicialCaseFileByCHBSchemaQuery
};