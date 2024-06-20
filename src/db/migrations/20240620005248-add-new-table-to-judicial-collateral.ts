import { DataTypes, QueryInterface } from "sequelize";

import judicialCollateralModel from "../models/judicial-collateral.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";
import departmentModel from "../models/settings/department.model";
import districtModel from "../models/settings/district.model";
import provinceModel from "../models/settings/province.model";
import judicialNotaryModel from "../models/judicial-notary.model";
import judicialRegisterOfficeModel from "../models/judicial-register-office.model";
import judicialRegistrationAreaModel from "../models/judicial-registration-area.model";
import judicialUseOfPropertyModel from "../models/judicial-use-of-property.model";

const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { DEPARTMENT_TABLE } = departmentModel;
const { DISTRICT_TABLE } = districtModel;
const { PROVINCE_TABLE } = provinceModel;
const { JUDICIAL_NOTARY_TABLE } = judicialNotaryModel;
const { JUDICIAL_REGISTER_OFFICE_TABLE } = judicialRegisterOfficeModel;
const { JUDICIAL_REGISTRATION_AREA_TABLE } = judicialRegistrationAreaModel;
const { JUDICIAL_USE_OF_PROPERTY_TABLE } = judicialUseOfPropertyModel;

export async function up (queryInterface: QueryInterface) {
  await queryInterface.createTable(JUDICIAL_COLLATERAL_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_collateral",
      type: DataTypes.INTEGER,
    },
    kindOfProperty: {
      allowNull: false,
      field: "kind_of_property",
      type: DataTypes.STRING,
    },
    propertyAddress: {
      allowNull: false,
      field: "property_address",
      type: DataTypes.STRING,
    },
    propertyFeatures: {
      allowNull: false,
      field: "property_features",
      type: DataTypes.STRING,
    },
    landArea: {
      allowNull: false,
      field: "land_area",
      type: DataTypes.STRING,
    },
    constructionArea: {
      allowNull: false,
      field: "construction_area",
      type: DataTypes.STRING,
    },
    electronicRecord: {
      allowNull: false,
      field: "electronic_record",
      type: DataTypes.STRING,
    },
    dateOfPublicDeed: {
      allowNull: false,
      field: "date_of_public_deed",
      type: DataTypes.DATE,
    },
    numberOfCollateral: {
      allowNull: false,
      field: "number_of_collateral",
      type: DataTypes.INTEGER,
    },
    registrationSeat: {
      allowNull: false,
      field: "registration_seat",
      type: DataTypes.STRING,
    },
    customerHasBankId: {
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    departmentId: {
      allowNull: false,
      field: "department_id",
      type: DataTypes.INTEGER,
      references: {
        model: DEPARTMENT_TABLE,
        key: "id_department",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    provinceId: {
      allowNull: false,
      field: "province_id",
      type: DataTypes.INTEGER,
      references: {
        model: PROVINCE_TABLE,
        key: "id_province",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    districtId: {
      allowNull: false,
      field: "district_id",
      type: DataTypes.INTEGER,
      references: {
        model: DISTRICT_TABLE,
        key: "id_district",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    useOfPropertyId: {
      allowNull: false,
      field: "use_of_property_id",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_USE_OF_PROPERTY_TABLE,
        key: "id_judicial_use_of_property",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    registrationAreaId: {
      allowNull: false,
      field: "registration_area_id",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_REGISTRATION_AREA_TABLE,
        key: "id_judicial_registration_area",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    registerOfficeId: {
      allowNull: false,
      field: "register_office",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_REGISTER_OFFICE_TABLE,
        key: "id_judicial_register_office",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    notaryId: {
      allowNull: false,
      field: "notary_id",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_NOTARY_TABLE,
        key: "id_judicial_notary",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      field: "deleted_at",
      type: DataTypes.DATE,
    },
  })
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(JUDICIAL_COLLATERAL_TABLE);
}