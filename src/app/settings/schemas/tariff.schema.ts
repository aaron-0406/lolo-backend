import Joi from 'joi';

const customerHasBankId = Joi.number()
const id = Joi.number();

const getTariffsSchema = Joi.object<
  { chb: number },
  true
>({
  chb: customerHasBankId.required(),
});

const getTariffSchemaById = Joi.object< { id: number }, true>({
  id: id.required().messages({
    "number.base": "El campo id es inválido",
    "number.empty": "El campo id no puede estar vacío",
    "any.required": "El campo id es requerido.",
  }),
});

const createTariffSchema = Joi.object<
  {
    code: string;
    type: string;
    description: string;
    customerHasBankId: number;
    value: number;
  },
  true
>({
  code: Joi.string().required().messages({
    "string.base": "El campo código es inválido",
    "string.empty": "El campo código no puede estar vacío",
    "any.required": "El campo códigocode es requerido.",
  }),
  type: Joi.string().required().messages({
    "string.base": "El campo tipo es inválido",
    "string.empty": "El campo tipo no puede estar vacío",
    "any.required": "El campo tipo es requerido.",
  }),
  description: Joi.string().required().messages({
    "string.base": "El campo descripción es inválido",
    "string.empty": "El campo descripción no puede estar vacío",
    "any.required": "El campo descripción es requerido.",
  }),
  customerHasBankId: customerHasBankId.required(),
  value: Joi.number().required().messages({
    "number.base": "El campo costo es inválido",
    "any.required": "El campo costo es requerido.",
  }),
});

const updateTariffSchema = Joi.object<
  {
    code: string;
    type: string;
    description: string;
    customerHasBankId: number;
    value: number;
  },
  true
>({
  code: Joi.string().required().messages({
    "string.base": "El campo código es inválido",
    "string.empty": "El campo código no puede estar vacío",
    "any.required": "El campo códigocode es requerido.",
  }),
  type: Joi.string().required().messages({
    "string.base": "El campo tipo es inválido",
    "string.empty": "El campo tipo no puede estar vacío",
    "any.required": "El campo tipo es requerido.",
  }),
  description: Joi.string().required().messages({
    "string.base": "El campo descripción es inválido",
    "string.empty": "El campo descripción no puede estar vacío",
    "any.required": "El campo descripción es requerido.",
  }),
  customerHasBankId: customerHasBankId.required(),
  value: Joi.number().required().messages({
    "number.base": "El campo costo es inválido",
    "any.required": "El campo costo es requerido.",
  }),
});

const deleteTariffSchema = Joi.object<{ id: number }, true>({
  id: id.required().messages({
    "number.base": "El campo id es inválido",
    "number.empty": "El campo id no puede estar vacío",
    "any.required": "El campo id es requerido.",
  }),
});

export default {
  getTariffsSchema,
  createTariffSchema,
  updateTariffSchema,
  deleteTariffSchema,
};