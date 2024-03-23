import { Op } from "sequelize";
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

  async findByCustomerId(customerId: string, query: any) {
    const { limit, page, actions, users } = query;

    const limite = parseInt(limit, 10);
    const pagina = parseInt(page, 10);
    const listActions = JSON.parse(actions);
    const listUsers = JSON.parse(users);

    const filters: any = {};

    if (listActions.length) {
      filters.codeAction = { [Op.in]: listActions };
    }
    if (listUsers.length) {
      filters.customer_user_id_customer_user = { [Op.in]: listUsers };
    }
    let filtersWhere: any = {
      customer_id_customer: customerId,
    };
    if (Object.keys(filters).length > 0) {
      filtersWhere = {
        [Op.or]: [filters],
        customer_id_customer: customerId,
      };
    }

    const quantity = await models.USER_LOG.count({
      where: filtersWhere,
    });

    const logs = await models.USER_LOG.findAll({
      include: ["customerUser"],
      order: [["id", "DESC"]],
      limit: limite,
      offset: (pagina - 1) * limite,
      where: filtersWhere,
    });

    return { logs, quantity };
  }

  async create(data: Omit<UserLogType, "id" | "createAt">) {
    const newUserLog = await models.USER_LOG.create(data);
    return newUserLog;
  }
}

export default UserLogService;
