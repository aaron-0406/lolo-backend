import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialCollateralChargesEncumbrancesType } from "../../app/judicial/types/judicial-collateral-charges-encumbrances.type";
import judicialCollateralChargesEncumbrancesTypeLoadModel from "./judicial-collateral-charges-encumbrances-type-load.model";
import judicialCollateralModel from "./judicial-collateral.model";

const JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE =
  "JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES";

const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel;
const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE } =
  judicialCollateralChargesEncumbrancesTypeLoadModel;

const JudicialCollateralChargesEncumbrancesSchema: ModelAttributes<
  JudicialCollateralChargesEncumbrances,
  JudicialCollateralChargesEncumbrancesType
> = {
  id: {
    type: DataTypes.INTEGER,
    field: "id_judicial_collateral_charges_encumbrances",
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  judicialCollateralIdJudicialCollateral: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "judicial_collateral_id_judicial_collateral",
    references: {
      model: JUDICIAL_COLLATERAL_TABLE,
      key: "id_judicial_collateral",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  typeOfLoadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "type_of_load_id",
    references: {
      model: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      key: "id_judicial_collateral_charges_encumbrances_type_load",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  amountOfImpactSoles: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: "amount_of_impact_soles",
  },
  amountOfImpactDollars: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: "amount_of_impact_dollars",
  },
  descriptionOfLoad: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    field: "description_of_load",
  },
  registrationSeat: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: "registration_seat",
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "registration_date",
  },
  range: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "range",
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
};

class JudicialCollateralChargesEncumbrances extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD, {
      as: "judicialCollateralChargesEncumbrancesTypeLoad",
    });
    this.belongsTo(models.JUDICIAL_COLLATERAL, {
      as: "judicialCollateralChargesEncumbrances",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
      modelName: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
      timestamps: false,
    };
  }
}

export default {
  JudicialCollateralChargesEncumbrances,
  JudicialCollateralChargesEncumbrancesSchema,
  JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
};
