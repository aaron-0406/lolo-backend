import { matchPassword } from "../../../libs/bcrypt";
import sequelize from "../../../libs/sequelize";
import { LoginType } from "../types/auth.type";
import boom from "@hapi/boom";
const { models } = sequelize;

class AuthService {
  constructor() {}
  async login(data: LoginType) {
    const { email, password } = data;
    const userApp = await models.USER_APP.findOne({
      where: { email },
    });
    if (!userApp) throw boom.notFound("Correo o contraseña incorrectos");
    if (!(await matchPassword(password, userApp.dataValues.password)))
      throw boom.notFound("Correo o contraseña incorrectos");
    return userApp;
  }
}

export default AuthService;
