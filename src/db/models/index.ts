import { Sequelize } from "sequelize";
import customerModel from "./customer.model";

const { Customer, CustomerSchema } = customerModel;

export const setupModels = (sequelize: Sequelize) => {
  Customer.init(CustomerSchema, Customer.config(sequelize));
};
