import { encryptPassword, matchPassword } from "../../../libs/bcrypt";
import sequelize from "../../../libs/sequelize";
import {
  ChangeCredentialsType,
  ChangePasswordType,
  LoginType,
} from "../types/auth.type";
import CustomerUserService from "../../dash/services/customer-user.service";
import boom from "@hapi/boom";
import speakeasy from "speakeasy";
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
          "Alcanzó el máximo número de intentos fallidos, su cuenta fue bloqueada."
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
    const customerUser = await models.CUSTOMER_USER.findOne({
      where: { id: customerUserId },
    });
    if (!customerUser) throw boom.notFound("Usuario no encontrado");
    const oldCustomerUser = { ...customerUser.get() };
    await models.CUSTOMER_USER.update(
      { dni, lastName: lastname, name, phone },
      { where: { id: customerUserId } }
    );
    return oldCustomerUser;
  }

  async generate2fa(email: string, userId: number) {
    const secret = speakeasy.generateSecret({ length: 32 }).ascii;
    const qrCodeUrl = speakeasy.otpauthURL({
      secret: secret,
      label: email,
      issuer: "LoloBank",
    });

    await models.CUSTOMER_USER.update(
      { code2fa: secret },
      { where: { id: userId } }
    );
    return qrCodeUrl;
  }

  async getQrCode(userId: number) {
    const userCustomer = await models.CUSTOMER_USER.findOne({
      where: { id: userId },
    });

    if (!userCustomer?.dataValues.code2fa)
      throw boom.notFound("Usuario no tiene habilitado doble factor");

    const email = userCustomer?.dataValues.email;
    const secret = userCustomer?.dataValues.code2fa;

    const qrCodeUrl = speakeasy.otpauthURL({
      secret: secret,
      label: email,
      issuer: "LoloBank",
    });

    return qrCodeUrl;
  }

  async verify2fa(token: string, userId: number) {
    const userCustomer = await models.CUSTOMER_USER.findOne({
      where: { id: userId },
    });

    const secret = userCustomer?.dataValues.code2fa;

    const verificationResult = speakeasy.totp.verify({
      secret: secret,
      encoding: "ascii",
      token: token,
      window: 6,
    });

    if (!verificationResult) {
      return false;
    }
    if(verificationResult && !userCustomer?.dataValues.firstAccess){
      await models.CUSTOMER_USER.update(
        { firstAccess: true },
        { where: { id: userId } }
      );
      return true;
    }
    return true;
  }
}

export default AuthService;
