import { encryptPassword, matchPassword } from "../../../libs/bcrypt";
import sequelize from "../../../libs/sequelize";
import {
  ChangeCredentialsType,
  ChangePasswordType,
  LoginType,
} from "../types/auth.type";
import boom from "@hapi/boom";
const { models } = sequelize;

class AuthService {
  constructor() {}
  async login(data: LoginType) {
    const { email, password, customerId } = data;

    const userCustomer = await models.CUSTOMER_USER.findOne({
      where: { email, customerId },
    });

    if (!userCustomer) throw boom.notFound("Correo o contraseña incorrectos");
    if (!userCustomer?.dataValues.state)
      throw boom.notFound("Usuario inhabilitado");
    if (!(await matchPassword(password, userCustomer.dataValues.password)))
      throw boom.notFound("Correo o contraseña incorrectos");

    return userCustomer;
  }

  async changePassword(data: ChangePasswordType, customerUserId: number) {
    const { repeatPassword, newPassword } = data;
    if (repeatPassword !== newPassword)
      throw boom.badData("Las contraseñas no coinciden");
    const password = await encryptPassword(newPassword);
    await models.CUSTOMER_USER.update(
      { password },
      { where: { id: customerUserId } }
    );
  }

  async changeCredentials(data: ChangeCredentialsType, customerUserId: number) {
    const { dni, lastname, name, phone } = data;
    await models.CUSTOMER_USER.update(
      { dni, lastName:lastname, name, phone },
      { where: { id: customerUserId } }
    );
  }
}

export default AuthService;
