import { Op, Sequelize } from "sequelize";
import sequelize from "../../../libs/sequelize";
import { UserLogType } from "../types/user-log.type";

const { models } = sequelize;

class UserLogService {
  constructor() {}

  async findAll() {
    const rta = await models.USER_LOG.findAll({
      attributes: [
        "id_user_log",
        "codeAction",
        "entityId",
        "entity",
        [
          Sequelize.literal(`
          CASE
        WHEN EXISTS (SELECT 1 FROM EXT_IP_ADDRESS_BANK WHERE ip = USER_LOG.ip AND deleted_at IS NULL)
        THEN (SELECT addressName FROM EXT_IP_ADDRESS_BANK WHERE ip = USER_LOG.ip AND deleted_at IS NULL LIMIT 1)
        ELSE USER_LOG.ip
        END
       `),
          "ip",
        ],
        "createAt",
        "customer_user_id_customer_user",
        "customer_id_customer",
      ],
    });

    return rta;
  }

  async findAllByCustomerId(customerId: string) {
    const rta = await models.USER_LOG.findAll({
      where: {
        customer_id_customer: customerId,
      },
      include: ["customerUser"],
      attributes: [
        "id_user_log",
        "codeAction",
        "entityId",
        "entity",
        [
          Sequelize.literal(`
            CASE
              WHEN EXISTS (SELECT 1 FROM EXT_IP_ADDRESS_BANK WHERE ip = USER_LOG.ip AND deleted_at IS NULL)
              THEN (SELECT addressName FROM EXT_IP_ADDRESS_BANK WHERE ip = USER_LOG.ip AND deleted_at IS NULL LIMIT 1)
              ELSE USER_LOG.ip
            END
          `),
          "ip",
        ],
        "createAt",
        "customer_user_id_customer_user",
        "customer_id_customer",
      ],
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
      attributes: [
        "id_user_log",
        "codeAction",
        "entityId",
        "entity",
        [
          Sequelize.literal(`
            CASE
              WHEN EXISTS (SELECT 1 FROM EXT_IP_ADDRESS_BANK WHERE ip = USER_LOG.ip AND deleted_at IS NULL)
              THEN (SELECT addressName FROM EXT_IP_ADDRESS_BANK WHERE ip = USER_LOG.ip AND deleted_at IS NULL LIMIT 1)
              ELSE USER_LOG.ip
            END
          `),
          "ip",
        ],
        "createAt",
        "customer_user_id_customer_user",
        "customer_id_customer",
      ],
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
