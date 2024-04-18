"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = __importDefault(require("../../libs/sequelize"));
const product_model_1 = __importDefault(require("../models/product.model"));
const { models } = sequelize_1.default;
const { PRODUCT_TABLE } = product_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        // await queryInterface.addColumn(
        //   PRODUCT_TABLE,
        //   "customer_has_bank_id_customer_has_bank",
        //   {
        //     allowNull: true,
        //     field: "customer_has_bank_id_customer_has_bank",
        //     type: DataTypes.INTEGER,
        //     references: {
        //       model: customerHasBankModel.CUSTOMER_HAS_BANK_TABLE,
        //       key: "id_customer_has_bank",
        //     },
        //     onUpdate: "CASCADE",
        //     onDelete: "NO ACTION",
        //   }
        // );
        const rta = yield models.PRODUCT.findAll({
            attributes: { exclude: ["clientId"] },
            include: [
                {
                    model: models.CLIENT,
                    as: "client",
                    attributes: ["customerHasBankId"],
                },
            ],
        });
        rta.forEach((record) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const client = record.dataValues.client.dataValues;
            if (client && client.customerHasBankId !== null) {
                try {
                    const product = yield models.PRODUCT.findByPk(record.dataValues.id);
                    if (product) {
                        yield product.update(Object.assign(Object.assign({}, product), { customerHasBankId: (_a = client.customerHasBankId) !== null && _a !== void 0 ? _a : null }));
                    }
                }
                catch (error) {
                    console.error("Error al actualizar el producto:", error);
                }
            }
        }));
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(PRODUCT_TABLE, "customer_has_bank_id_customer_has_bank");
    });
}
exports.down = down;
