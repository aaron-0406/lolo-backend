import { matchPassword } from "../../../libs/bcrypt";
import sequelize from "../../../libs/sequelize";
import { LoginType } from "../types/auth.type";
import boom from "@hapi/boom";
const { models } = sequelize;

class AuthService {
  constructor() {}
  async login(data: LoginType) {
    const { email, password } = data;
    const userCustomer = await models.CUSTOMER_USER.findOne({
      where: { email },
    });
    if (!userCustomer) throw boom.notFound("Correo o contraseña incorrectos");
    if (!(await matchPassword(password, userCustomer.dataValues.password)))
      throw boom.notFound("Correo o contraseña incorrectos");
    return userCustomer;
  }
}

export default AuthService;
