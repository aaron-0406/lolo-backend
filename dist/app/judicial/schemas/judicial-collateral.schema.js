"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const kindOfProperty = joi_1.default.string().min(1).max(150);
const propertyAddress = joi_1.default.string().min(1).max(150);
const propertyFeatures = joi_1.default.string().min(1).max(150);
const landArea = joi_1.default.string().min(1).max(150);
const constructionArea = joi_1.default.string().min(1).max(150);
const electronicRecord = joi_1.default.string().min(1).max(150);
const dateOfPublicDeed = joi_1.default.date();
const numberOfCollateral = joi_1.default.number();
const registrationSeat = joi_1.default.string().min(1).max(150);
const customerHasBankId = joi_1.default.number();
const departmentId = joi_1.default.number();
const provinceId = joi_1.default.number();
const districtId = joi_1.default.number();
const useOfPropertyId = joi_1.default.number();
const registrationAreaId = joi_1.default.number();
const registerOfficeId = joi_1.default.number();
const notaryId = joi_1.default.number();
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
exports.default = {
    createJudicialCollateralSchema,
    updateJudicialCollateralSchema,
    getJudicialCollateralByCHBSchema,
    getJudicialCollateralByIDSchema,
};
