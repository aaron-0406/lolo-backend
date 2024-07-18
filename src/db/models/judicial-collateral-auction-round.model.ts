import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialCollateralAuctionRoundType } from "../../app/judicial/types/judicial-collateral-auction-round.type";
import judicialCollateralModel from "./judicial-collateral.model";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE = "JUDICIAL_COLLATERAL_AUCTION_ROUND";
const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialCollateralAuctionRoundSchema: ModelAttributes<
  JudicialCollateralAuctionRound,
  JudicialCollateralAuctionRoundType
> = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id_judicial_collateral_auction_round",
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
  customerHasBankId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "customer_has_bank_id_customer_has_bank",
    references: {
      model: CUSTOMER_HAS_BANK_TABLE,
      key: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  appraisalDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "appraisal_date",
  },
  expertReportDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "expert_report_date",
  },
  encumbranceAmountSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "encumbrance_amount_soles",
  },
  encumbranceAmountDollars: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "encumbrance_amount_dollars",
  },
  conventionalValueSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "conventional_value_soles",
  },
  conventionalValueDollars: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "conventional_value_dollars",
  },
  marketValueSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "market_value_soles",
  },
  marketValueDollars: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "market_value_dollars",
  },
  realizationValueSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "realization_value_soles",
  },
  realizationValueDollars: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "realization_value_dollars",
  },
  auctionValueSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "auction_value_soles",
  },
  auctionValueDollars: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "auction_value_dollars",
  },
  auctionRound: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "auction_round",
  },
  firstCallSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "first_call_soles",
  },
  firstCallDollars: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "first_call_dollars",
  },
  secondCallSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "second_call_soles",
  },
  secondCallDollars: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "second_call_dollars",
  },
  thirdCallSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "third_call_soles",
  },
  thirdCallDollars: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "third_call_dollars",
  },
  appraisalExperts: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    field: "appraisal_experts",
  },
  auctionType: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: "auction_type",
  },
  auctionerName: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: "auctioner_name",
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

class JudicialCollateralAuctionRound extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.JUDICIAL_COLLATERAL, { as: "judicialCollateral" });
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
      modelName: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
  JudicialCollateralAuctionRoundSchema,
  JudicialCollateralAuctionRound,
};