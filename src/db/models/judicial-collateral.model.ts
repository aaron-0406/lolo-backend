import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialCollateralType } from '../../app/judicial/types/judicial-collateral.type';
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import judicialUseOfPropertyModel from "./judicial-use-of-property.model";
import departmentModel from "./settings/department.model";
import provinceModel from "./settings/province.model";
import districtModel from "./settings/district.model";
import judicialRegistrationAreaModel from "./judicial-registration-area.model";
import judicialRegisterOfficeModel from "./judicial-register-office.model";
import judicialNotaryModel from "./judicial-notary.model";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { JUDICIAL_USE_OF_PROPERTY_TABLE } = judicialUseOfPropertyModel;
const { DEPARTMENT_TABLE } = departmentModel;
const { PROVINCE_TABLE } = provinceModel;
const { DISTRICT_TABLE } = districtModel;
const { JUDICIAL_REGISTRATION_AREA_TABLE } = judicialRegistrationAreaModel;
const { JUDICIAL_REGISTER_OFFICE_TABLE } = judicialRegisterOfficeModel;
const { JUDICIAL_NOTARY_TABLE } = judicialNotaryModel;

const JUDICIAL_COLLATERAL_TABLE = "JUDICIAL_COLLATERAL";

const JudicialCollateralSchema: ModelAttributes<
  JudicialCollateral,
  JudicialCollateralType
> = {
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
    type: DataTypes.TEXT("long"),
  },
  propertyFeatures: {
    allowNull: false,
    field: "property_features",
    type: DataTypes.TEXT("long"),
  },
  landArea: {
    allowNull: false,
    field: "land_area",
    type: DataTypes.TEXT("long"),
  },
  constructionArea: {
    allowNull: false,
    field: "construction_area",
    type: DataTypes.TEXT("long"),
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
}

class JudicialCollateral extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.belongsTo(models.JUDICIAL_USE_OF_PROPERTY, { as: "useOfProperty" });
    this.belongsTo(models.DEPARTMENT, { as: "department" });
    this.belongsTo(models.PROVINCE, { as: "province" });
    this.belongsTo(models.DISTRICT, { as: "district" });
    this.belongsTo(models.JUDICIAL_REGISTRATION_AREA, { as: "registrationArea" });
    this.belongsTo(models.JUDICIAL_REGISTER_OFFICE, { as: "registerOffice" });
    this.belongsTo(models.JUDICIAL_NOTARY, { as: "notary" });

    this.hasMany(models.JUDICIAL_CASE_FILE_HAS_COLLATERAL, {
      as: "judicialCaseFileHasCollateral",
      foreignKey: "judicialCollateralId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_COLLATERAL_TABLE,
      modelName: JUDICIAL_COLLATERAL_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_COLLATERAL_TABLE,
  JudicialCollateralSchema,
  JudicialCollateral,
};