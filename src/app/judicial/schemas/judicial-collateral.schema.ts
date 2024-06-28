import Joi from "joi";
import { JudicialCollateralType } from "../types/judicial-collateral.type";

const id = Joi.number();
const kindOfProperty = Joi.string().min(1).max(150).messages({
  "string.empty": `El campo 'Tipo de propiedad' no puede estar vacío`
});
const propertyAddress = Joi.string().min(1).max(150).messages({
  "string.empty": `El campo 'Dirección de la propiedad' no puede estar vacío`}) ;
const propertyFeatures = Joi.string().min(1).max(150).messages({
  "string.empty": `El campo 'Características de la propiedad' no puede estar vacío`}) ;
const landArea = Joi.string().min(1).max(150).messages({
  "string.empty": `El campo 'Área de terreno' no puede estar vacío`}) ;
const constructionArea = Joi.string().min(1).max(150).messages({
  "string.empty": `El campo 'Área de construcción' no puede estar vacío`
});
const electronicRecord = Joi.string().min(1).max(150).messages({
  "string.empty": `El campo 'Registro electrónico' no puede estar vacío`
});
const dateOfPublicDeed = Joi.date().messages({
  "date.base": `El campo 'Fecha de escritura pública' debe ser una fecha válida`
});
const numberOfCollateral = Joi.number().messages({
  "number.base": `El campo 'Número de garantía' debe ser un número`
});
const registrationSeat = Joi.string().min(1).max(150).messages({
  "string.empty": `El campo 'Asiento de registro' no puede estar vacío`
});
const customerHasBankId = Joi.number().messages({
  "number.base": `El campo 'Banco del cliente' debe ser un número`
});
const departmentId = Joi.number().messages({
  "number.base": `Debe seleccionar un departamento`
});
const provinceId = Joi.number().messages({
  "number.base": `Debe seleccionar una provincia`
});
const districtId = Joi.number().messages({
  "number.base": `Debe seleccionar un distrito`
});
const useOfPropertyId = Joi.number().messages({
  "number.base": `Debe seleccionar un uso del bien`
}) ;
const registrationAreaId = Joi.number().messages({
  "number.base": `Debe seleccionar una zona registral`
});
const registerOfficeId = Joi.number().messages({
  "number.base": `Debe seleccionar una oficina registral`
});
const notaryId = Joi.number().messages({
  "number.base": `Debe seleccionar un notario`
});

const createJudicialCollateralSchema = Joi.object<
  Omit<JudicialCollateralType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  kindOfProperty: kindOfProperty.required(),
  propertyAddress: propertyAddress.required(),
  propertyFeatures: propertyFeatures.required(),
  landArea: landArea.required(),
  constructionArea: constructionArea.required(),
  electronicRecord: electronicRecord.required(),
  dateOfPublicDeed: dateOfPublicDeed.required(),
  numberOfCollateral: numberOfCollateral.required(),
  registrationSeat: registrationSeat.required(),
  customerHasBankId: customerHasBankId.required(),
  departmentId: departmentId.required(),
  provinceId: provinceId.required(),
  districtId: districtId.required(),
  useOfPropertyId: useOfPropertyId.required(),
  registrationAreaId: registrationAreaId.required(),
  registerOfficeId: registerOfficeId.required(),
  notaryId: notaryId.required(),
});

const updateJudicialCollateralSchema = Joi.object<
  Omit<JudicialCollateralType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  kindOfProperty: kindOfProperty.required(),
  propertyAddress: propertyAddress.required(),
  propertyFeatures: propertyFeatures.required(),
  landArea: landArea.required(),
  constructionArea: constructionArea.required(),
  electronicRecord: electronicRecord.required(),
  dateOfPublicDeed: dateOfPublicDeed.required(),
  numberOfCollateral: numberOfCollateral.required(),
  registrationSeat: registrationSeat.required(),
  departmentId: departmentId.required(),
  provinceId: provinceId.required(),
  districtId: districtId.required(),
  useOfPropertyId: useOfPropertyId.required(),
  registrationAreaId: registrationAreaId.required(),
  registerOfficeId: registerOfficeId.required(),
  notaryId: notaryId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialCollateralByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialCollateralByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getJudicialCollateralByJudicialCaseFileIdSchema = Joi.object<{ JudicialCaseFileId: number }, true>({
  JudicialCaseFileId: id.required(),
})

export default {
  createJudicialCollateralSchema,
  updateJudicialCollateralSchema,
  getJudicialCollateralByCHBSchema,
  getJudicialCollateralByIDSchema,
  getJudicialCollateralByJudicialCaseFileIdSchema
};