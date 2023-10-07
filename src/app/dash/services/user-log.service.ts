import sequelize from "../../../libs/sequelize";
import { UserLogType } from "../types/user-log.type";

const { models } = sequelize;

class UserLogService {
  constructor() {}

  async findAll() {
    const rta = await models.USER_LOG.findAll();
    return rta;
  }

  async findAllByCustomerId(customerId: string) {
    const rta = await models.USER_LOG.findAll({
      where: {
        customer_id_customer: customerId,
      },
      include: ["customerUser"],
      order: [["id", "DESC"]],
    });

    return rta;
  }

  async create(data: Omit<UserLogType, "id" | "createAt">) {
    const newUserLog = await models.USER_LOG.create(data);
    return newUserLog;
  }
}

export default UserLogService;
