"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const kindOfProperty = joi_1.default.string().min(1).max(150).messages({
    "string.empty": `El campo 'Tipo de propiedad' no puede estar vacío`
});
const propertyAddress = joi_1.default.string().min(1).messages({
    "string.empty": `El campo 'Dirección de la propiedad' no puede estar vacío`
});
const propertyFeatures = joi_1.default.string().min(1).messages({
    "string.empty": `El campo 'Características de la propiedad' no puede estar vacío`
});
const landArea = joi_1.default.string().min(1).messages({
    "string.empty": `El campo 'Área de terreno' no puede estar vacío`
});
const constructionArea = joi_1.default.string().min(1).messages({
    "string.empty": `El campo 'Área de construcción' no puede estar vacío`
});
const electronicRecord = joi_1.default.string().min(1).max(150).messages({
    "string.empty": `El campo 'Registro electrónico' no puede estar vacío`
});
const dateOfPublicDeed = joi_1.default.date().messages({
    "date.base": `El campo 'Fecha de escritura pública' debe ser una fecha válida`
});
const numberOfCollateral = joi_1.default.number().messages({
    "number.base": `El campo 'Número de garantía' debe ser un número`
});
const registrationSeat = joi_1.default.string().min(1).max(150).messages({
    "string.empty": `El campo 'Asiento de registro' no puede estar vacío`
});
const customerHasBankId = joi_1.default.number().messages({
    "number.base": `El campo 'Banco del cliente' debe ser un número`
});
const departmentId = joi_1.default.number().messages({
    "number.base": `Debe seleccionar un departamento`,
    "any.required": `Debe seleccionar un departamento`
});
const provinceId = joi_1.default.number().messages({
    "number.base": `Debe seleccionar una provincia`,
    "any.required": `Debe seleccionar una provincia`
});
const districtId = joi_1.default.number().messages({
    "number.base": `Debe seleccionar un distrito`,
    "any.required": `Debe seleccionar un distrito`
});
const useOfPropertyId = joi_1.default.number().messages({
    "number.base": `Debe seleccionar un uso del bien`,
    "any.required": `Debe seleccionar un uso del bien`
});
const registrationAreaId = joi_1.default.number().messages({
    "number.base": `Debe seleccionar una zona registral`,
    "any.required": "El campo 'Zona registral' es obligatorio",
});
const registerOfficeId = joi_1.default.number().messages({
    "number.base": `Debe seleccionar una oficina registral`,
    "any.required": `Debe seleccionar una oficina registral`
});
const notaryId = joi_1.default.number().messages({
    "number.base": `Debe seleccionar un notario`,
    "any.required": `Debe seleccionar un notario`
});
const createJudicialCollateralSchema = joi_1.default.object({
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
const updateJudicialCollateralSchema = joi_1.default.object({
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
const getJudicialCollateralByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialCollateralByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getJudicialCollateralByJudicialCaseFileIdSchema = joi_1.default.object({
    JudicialCaseFileId: id.required(),
});
exports.default = {
    createJudicialCollateralSchema,
    updateJudicialCollateralSchema,
    getJudicialCollateralByCHBSchema,
    getJudicialCollateralByIDSchema,
    getJudicialCollateralByJudicialCaseFileIdSchema
};
