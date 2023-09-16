import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CustomerUserType } from "../types/customer-user.type";
import { encryptPassword } from "../../../libs/bcrypt";

const { models } = sequelize;

class CustomerUserService {
  constructor() {}

  async findAll() {
    const rta = await models.CUSTOMER_USER.findAll();
    return rta;
  }

  async findAllByCustomerID(customerId: string) {
    const rta = await models.CUSTOMER_USER.findAll({
      include: ["role"],
      attributes: {
        exclude: ["password"],
      },
      where: {
        customer_id_customer: customerId,
      },
    });

    if (!rta) {
      throw boom.notFound("Cliente no encontrado");
    }
    return rta;
  }

  async findOne(id: string) {
    const user = await models.CUSTOMER_USER.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }
    return user;
  }

  async create(data: CustomerUserType) {
    data.password = await encryptPassword(data.password);
    const newUser = await models.CUSTOMER_USER.create(data);
    return newUser;
  }

  async update(id: string, changes: CustomerUserType) {
    const user = await this.findOne(id);
    if (changes.password)
      changes.password = await encryptPassword(changes.password);
    const rta = await user.update(changes);

    return rta;
  }

  async updateState(id: string, state: boolean) {
    const user = await this.findOne(id);
    const rta = await user.update({ ...user, state });

    return rta;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await user.destroy();

    return { id };
  }
}

export default CustomerUserService;
