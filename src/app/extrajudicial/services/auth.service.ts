import { encryptPassword, matchPassword } from "../../../libs/bcrypt";
import sequelize from "../../../libs/sequelize";
import {
  ChangeCredentialsType,
  ChangePasswordType,
  LoginType,
} from "../types/auth.type";
import CustomerUserService from "../../dash/services/customer-user.service";
import boom from "@hapi/boom";
const { models } = sequelize;

const service = new CustomerUserService();

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
    if (!(await matchPassword(password, userCustomer.dataValues.password))) {
      if (userCustomer?.dataValues.loginAttempts >= 2) {
        service.updateState(String(customerId), false);
        throw boom.notFound(
          "Alcanzó el máximo número de intentos fallidos, inténtelo más tarde"
        );
      }
      service.failedAttemptsCounter(String(customerId), false);
      throw boom.notFound("Correo o contraseña incorrectos");
    }

    service.failedAttemptsCounter(String(customerId), true);
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
      { dni, lastName: lastname, name, phone },
      { where: { id: customerUserId } }
    );
  }
}

export default AuthService;
