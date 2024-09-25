import Joi, { not } from "joi";
import { JudicialBinnacleType } from "../types/judicial-binnacle.type";

const id = Joi.number();
const lastPerformed = Joi.string();
const judicialBinProceduralStageId = Joi.number();
const customerHasBankId = Joi.number();
const binnacleTypeId = Joi.number();
const judicialFileCaseId = Joi.number();
const date = Joi.date();
const sortBy = Joi.string().optional().empty("").allow("");
const order = Joi.string().optional().empty("").allow("");
const index = Joi.number().optional().empty("").allow("");
const resolutionDate = Joi.date().optional().empty("").allow("");
const entryDate = Joi.date().optional().empty("").allow("");
const notificationType = Joi.string().optional().empty("").allow("");
const acto = Joi.string().optional().empty("").allow("");
const fojas = Joi.number().optional().empty("").allow("");
const folios = Joi.number().optional().empty("").allow("");
const provedioDate = Joi.date().optional().empty("").allow("");
const userDescription = Joi.string().optional().empty("").allow("");
const createdBy = Joi.number().optional().empty("").allow("");
const totalTariff = Joi.number().optional().empty(0).allow(0).messages({
  "number.empty": "El debe seleccionar un proceso",
});
const tariffHistory = Joi.string().optional().empty("").allow("").messages({
  "string.empty": "No se selecciono ningun proceso",
});

const createJudicialBinnacleSchema = Joi.object<
  Omit<JudicialBinnacleType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  binnacleTypeId: binnacleTypeId.required(),
  judicialBinProceduralStageId: judicialBinProceduralStageId.required(),
  customerHasBankId: customerHasBankId.required(),
  lastPerformed: lastPerformed.required(),
  date: date.required(),
  totalTariff: totalTariff.required(),
  tariffHistory: tariffHistory.required(),
  judicialFileCaseId: judicialFileCaseId.required(),
  index: index.required(),
  resolutionDate: resolutionDate.required(),
  entryDate: entryDate.required(),
  notificationType: notificationType.required(),
  acto: acto.required(),
  fojas: fojas.required(),
  folios: folios.required(),
  provedioDate: provedioDate.required(),
  userDescription: userDescription.required(),
  createdBy: createdBy.required(),
});

const updateJudicialBinnacleSchema = Joi.object<
  Omit<
    JudicialBinnacleType,
    | "id"
    | "customerHasBankId"
    | "judicialFileCaseId"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  >,
  true
>({
  lastPerformed: lastPerformed.required(),
  judicialBinProceduralStageId: judicialBinProceduralStageId.required(),
  binnacleTypeId: binnacleTypeId.required(),
  date: date.required(),
  index: index.required(),
  resolutionDate: resolutionDate.required(),
  entryDate: entryDate.required(),
  notificationType: notificationType.required(),
  acto: acto.required(),
  fojas: fojas.required(),
  folios: folios.required(),
  provedioDate: provedioDate.required(),
  userDescription: userDescription.required(),
  createdBy: createdBy.required(),
  totalTariff: totalTariff.required(),
  tariffHistory: tariffHistory.required(),
});

const getJudicialBinnacleByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const createJudicialBinnacleParamSchema = Joi.object<
  { code: string; idCustomer: number },
  true
>({
  code: Joi.string().required(),
  idCustomer: Joi.number().required(),
});
const updateJudicialBinnacleParamSchema = Joi.object<
  { id: number; code: string; idCustomer: number },
  true
>({
  id: id.required(),
  code: Joi.string().required(),
  idCustomer: Joi.number().required(),
});

const updateJudicialBinnacleTariffBodySchema = Joi.object<
  { totalTariff: number, tariffHistory:string },
  true
>({
  totalTariff: totalTariff,
  tariffHistory: tariffHistory,
});

const getJudicialBinnacleByCHBSchema = Joi.object<{ fileCase: number }, true>({
  fileCase: Joi.number().required(),
});

const getJudicialBinnacleByCHBSchemaQuery = Joi.object({
  sortBy,
  order,
}).options({ abortEarly : true });

export default {
  createJudicialBinnacleSchema,
  updateJudicialBinnacleSchema,
  getJudicialBinnacleByCHBSchema,
  getJudicialBinnacleByIDSchema,
  createJudicialBinnacleParamSchema,
  updateJudicialBinnacleParamSchema,
  updateJudicialBinnacleTariffBodySchema,
  getJudicialBinnacleByCHBSchemaQuery,
};
