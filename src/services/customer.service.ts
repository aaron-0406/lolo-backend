import sequelize from "../libs/sequelize";
import boom from "@hapi/boom";
import { CustomerType } from "../types/customer.type";

const { models } = sequelize;

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.CUSTOMER.findAll();
    return rta;
  }

  async findOne(id: string) {
    const customer = await models.CUSTOMER.findByPk(id);
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }

  async create(data: CustomerType) {
    const newCustomer = await models.CUSTOMER.create(data);
    return newCustomer;
  }

  async update(id: string, changes: CustomerType) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);

    return rta;
  }

  async delete(id: string) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return { id };
  }
}

export default CustomerService;
