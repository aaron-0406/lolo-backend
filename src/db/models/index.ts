import { Sequelize } from "sequelize";
import banksModel from "./banks.model";
import customerModel from "./customer.model";

const { Customer, CustomerSchema } = customerModel;
const { Bank, BankSchema } = banksModel;

export const setupModels = (sequelize: Sequelize) => {
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Bank.init(BankSchema, Bank.config(sequelize));
};
