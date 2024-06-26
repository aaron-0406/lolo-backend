import Joi from "joi";
import { JudicialCollateralType } from "../types/judicial-collateral.type";

const id = Joi.number();
const kindOfProperty = Joi.string().min(1).max(150);
const propertyAddress = Joi.string().min(1).max(150);
const propertyFeatures = Joi.string().min(1).max(150);
const landArea = Joi.string().min(1).max(150);
const constructionArea = Joi.string().min(1).max(150);
const electronicRecord = Joi.string().min(1).max(150);
const dateOfPublicDeed = Joi.date()
const numberOfCollateral = Joi.number();
const registrationSeat = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();
const departmentId = Joi.number();
const provinceId = Joi.number();
const districtId = Joi.number();
const useOfPropertyId = Joi.number();
const registrationAreaId = Joi.number();
const registerOfficeId = Joi.number();
const notaryId = Joi.number();

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