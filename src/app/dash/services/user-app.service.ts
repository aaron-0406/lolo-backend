import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { UserAppType } from "../types/user-app";
import { encryptPassword } from "../../../libs/bcrypt";

const { models } = sequelize;

class CustomerUserService {
  constructor() {}

  async findAll() {
    const rta = await models.USER_APP.findAll();

    return rta;
  }

  async findOne(id: string) {
    const user = await models.USER_APP.findByPk(id);

    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }
    return user;
  }

  async create(data: UserAppType) {
    data.password = await encryptPassword(data.password);
    const newUser = await models.USER_APP.create(data);

    return newUser;
  }

  async update(id: string, changes: UserAppType) {
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
