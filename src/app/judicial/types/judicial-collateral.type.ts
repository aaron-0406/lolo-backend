export type JudicialCollateralType = {
  id: number;
  kindOfProperty: string;
  propertyAddress: string;
  propertyFeatures: string;
  landArea: string;
  constructionArea: string;
  electronicRecord: string;
  dateOfPublicDeed: Date;
  numberOfCollateral: number;
  registrationSeat: string;

  customerHasBankId: number;
  departmentId: number;
  provinceId: number;
  districtId: number;
  useOfPropertyId: number;
  registrationAreaId: number;
  registerOfficeId: number;
  notaryId: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
