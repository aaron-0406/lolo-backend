import { QueryInterface, DataTypes } from 'sequelize';
import customerModel from '../models/customer.model';

const { CUSTOMER_TABLE } = customerModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CUSTOMER_TABLE, 'is_scrapper_active', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
}