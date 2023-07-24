import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";

import { GoalType } from "../types/goal.type";
import {
  extractDate,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  sumarDias,
} from "../../../libs/helpers";
import { Op } from "sequelize";

const { models } = sequelize;

type QuerySearch = {
  limit: number;
  page: number;
};

class GoalService {
  constructor() {}
  async findAll(customerId: number, opts: QuerySearch) {
    const { limit, page } = opts;

    const rtaCount = await models.GOAL.count({
      where: {
        customerId,
      },
    });
    const query = `
      SELECT
        id_goal as id,
        start_date as startDate,
        end_date as endDate,
        week,
        customer_id_customer as customerId,
        (SELECT COUNT(*) FROM COMMENT c WHERE c.customer_user_id_customer_user IN (SELECT id_customer_user FROM CUSTOMER_USER WHERE customer_id_customer = ${customerId}) AND c.date BETWEEN g.start_date AND g.end_date) as total,
        CAST(IFNULL((SELECT SUM(quantity) FROM GOAL_USER gu WHERE gu.goal_id_goal = g.id_goal),0) AS UNSIGNED) AS totalMeta
      FROM GOAL g
      WHERE customer_id_customer = ${customerId}
      ORDER BY g.id_goal DESC
      LIMIT ${(page - 1) * limit}, ${limit}
    `;
    const goals: any[] = await sequelize.query(query);
    return { goals: goals[0], quantity: rtaCount };
  }

  async findByID(goalId: number, customerId: number) {
    const query = `
      SELECT
        id_goal as id,
        start_date as startDate,
        end_date as endDate,
        week,
        customer_id_customer as customerId,
        (SELECT COUNT(*) FROM COMMENT c WHERE c.customer_user_id_customer_user IN (SELECT id_customer_user FROM CUSTOMER_USER WHERE customer_id_customer = ${customerId}) AND c.date BETWEEN g.start_date AND g.end_date) as total,
        CAST(IFNULL((SELECT SUM(quantity) FROM GOAL_USER gu WHERE gu.goal_id_goal = g.id_goal),0) AS UNSIGNED) AS totalMeta
      FROM GOAL g
      WHERE customer_id_customer = ${customerId} AND g.id_goal = ${goalId}
    `;
    const goals: any[] = await sequelize.query(query);

    if (!goals[0][0]) throw boom.notFound("Meta no encontrada");
    return goals[0][0];
  }

  async finGlobalGoal(customerId: number) {
    const result = await models.GOAL.findOne({
      attributes: [
        "id_goal",
        ["start_date", "startDate"],
        ["end_date", "endDate"],
        "week",
        ["customer_id_customer", "customerId"],
        [
          sequelize.literal(`
        (SELECT COUNT(*)
        FROM COMMENT c
        WHERE c.customer_user_id_customer_user IN
          (SELECT id_customer_user
          FROM CUSTOMER_USER
          WHERE customer_id_customer = ${customerId})
        AND c.date BETWEEN GOAL.start_date AND GOAL.end_date)
      `),
          "total",
        ],
        [
          sequelize.literal(`
        CAST(IFNULL((SELECT SUM(quantity) FROM GOAL_USER gu WHERE gu.goal_id_goal = GOAL.id_goal),0) AS UNSIGNED)
      `),
          "totalMeta",
        ],
      ],
      where: {
        customer_id_customer: customerId,
        start_date: { [Op.lte]: new Date() },
      },
    });
    return result;
  }

  async findCustomerUserByGoalId(goalId: number) {
    const result = await sequelize.models.GOAL_USER.findAll({
      attributes: [
        ["id_goal_user", "id"],
        "quantity",
        [
          sequelize.literal(`
            (SELECT COUNT(c.id_comment)
            FROM COMMENT c
            INNER JOIN CUSTOMER_USER cu ON cu.id_customer_user = c.customer_user_id_customer_user
            WHERE c.date BETWEEN (SELECT start_date FROM GOAL g WHERE g.id_goal = ${goalId}) AND (SELECT end_date FROM GOAL g WHERE g.id_goal = ${goalId})
            AND c.customer_user_id_customer_user = \`customerUser\`.\`id_customer_user\`)
          `),
          "totalRealizados",
        ],
        ["goal_id_goal", "goalId"],
        ["customer_user_id_customer_user", "customerUserId"],
      ],
      include: {
        model: sequelize.models.CUSTOMER_USER,
        as: "customerUser",
        attributes: [
          ["id_customer_user", "id"],
          "name",
          ["last_name", "lastName"],
          ["customer_id_customer", "customerId"],
        ],
      },
      where: {
        goal_id_goal: goalId,
      },
    });

    return result;
  }

  async findGoalUserByCustomerId(customerUserId: number) {
    const result = await models.GOAL.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(c.id_comment)
              FROM COMMENT c
              WHERE c.customer_user_id_customer_user = ${customerUserId}
              AND c.date BETWEEN GOAL.start_date AND GOAL.end_date
            )`),
            "total",
          ],
          [
            sequelize.literal(
              `CAST(IFNULL((SELECT SUM(quantity) FROM GOAL_USER gu WHERE gu.goal_id_goal = GOAL.id_goal AND gu.customer_user_id_customer_user=${customerUserId}),0) AS UNSIGNED)`
            ),
            "totalMeta",
          ],
        ],
      },
      include: [
        {
          model: models.GOAL_USER,
          where: { customerUserId },
          as: "goalUser",
          attributes: [],
        },
      ],
      where: {
        start_date: { [Op.lte]: new Date() },
      },
    });
    if (!result[0]) throw boom.notFound("Meta no encontrada");
    return result[0];
  }

  async create(data: GoalType) {
    const { week, startDate } = data;
    const firstDay = getFirstDayOfWeek();
    const { day, month, year } = extractDate(startDate + "");
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    if (date < firstDay)
      throw boom.badData(
        "La fecha de inicio de no puede ser menor a la semana actual"
      );
    const newStartDate = getFirstDayOfWeek(new Date(startDate));
    const lastDay = getLastDayOfWeek(new Date(startDate));
    const lastDayWeeks = sumarDias(lastDay, (week - 1) * 7);
    const newGoal = await models.GOAL.create({
      ...data,
      startDate: newStartDate,
      endDate: lastDayWeeks,
    });

    const customerUsers = await models.CUSTOMER_USER.findAll({
      where: {
        customerId: data.customerId,
      },
    });

    for (let i = 0; i < customerUsers.length; i++) {
      const customerUser = customerUsers[i];
      await models.GOAL_USER.create({
        quantity: 0,
        goalId: newGoal.dataValues.id,
        customerUserId: customerUser.dataValues.id,
      });
    }
    const goalFound = await this.findByID(
      newGoal.dataValues.id,
      data.customerId
    );
    return goalFound;
  }

  async update(id: number, customerId: number, changes: GoalType) {
    const { week, startDate } = changes;
    const firstDay = getFirstDayOfWeek();
    const { day, month, year } = extractDate(startDate + "");
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    if (date < firstDay)
      throw boom.badData(
        "La fecha de inicio de no puede ser menor a la semana actual"
      );
    const newStartDate = getFirstDayOfWeek(new Date(startDate));
    const lastDay = getLastDayOfWeek(new Date(startDate));
    const lastDayWeeks = sumarDias(lastDay, (week - 1) * 7);
    const goal = await sequelize.models.GOAL.findByPk(id);
    if (!goal) throw boom.notFound("Meta no encontrada");
    await goal.update({
      ...changes,
      startDate: newStartDate,
      endDate: lastDayWeeks,
    });
    const goalEdited = await this.findByID(id, customerId);
    return goalEdited;
  }

  async delete(id: number) {
    await sequelize.models.GOAL_USER.destroy({
      where: {
        goalId: id,
      },
    });
    const goal = await sequelize.models.GOAL.findByPk(id);
    if (!goal) throw boom.notFound("Meta no encontrada");
    await goal.destroy();
    return goal;
  }
}

export default GoalService;
