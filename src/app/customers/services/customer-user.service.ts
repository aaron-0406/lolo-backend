import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CustomerUserType } from "../types/customer-user.type";

const { models } = sequelize;

class CustomerUserService {
  constructor() {}

  async findAll() {
    const rta = await models.CUSTOMER_USER.findAll();
    return rta;
  }

  async findOne(id: string) {
    const user = await models.CUSTOMER_USER.findByPk(id);

    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }
    return user;
  }

  async create(data: CustomerUserType) {
    const newUser = await models.CUSTOMER_USER.create(data);
    return newUser;
  }

  async update(id: string, changes: CustomerUserType) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);

    return rta;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await user.destroy();

    return { id };
  }
}

export default CustomerUserService;
