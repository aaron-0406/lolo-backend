import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";

import { GoalType } from "../types/goal.type";
import {
  extractDate,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  sumarDias,
} from "../../../libs/helpers";

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
        (SELECT COUNT(*) FROM comment c WHERE c.customer_user_id_customer_user IN (SELECT id_customer FROM Customer WHERE id_customer = g.customer_id_customer) AND c.date BETWEEN g.start_date AND g.end_date) as total,
        CAST(IFNULL((SELECT SUM(quantity) FROM goal_user gu WHERE gu.goal_id_goal = g.id_goal),0) AS UNSIGNED) AS totalMeta
      FROM Goal g 
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
        (SELECT COUNT(*) FROM comment c WHERE c.customer_user_id_customer_user IN (SELECT id_customer FROM Customer WHERE id_customer = g.customer_id_customer) AND c.date BETWEEN g.start_date AND g.end_date) as total,
        CAST(IFNULL((SELECT SUM(quantity) FROM goal_user gu WHERE gu.goal_id_goal = g.id_goal),0) AS UNSIGNED) AS totalMeta
      FROM Goal g 
      WHERE customer_id_customer = ${customerId} AND g.id_goal = ${goalId}
    `;
    const goals: any[] = await sequelize.query(query);

    if (!goals[0][0]) throw boom.notFound("Meta no encontrada");
    return goals[0][0];
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
    const lastDay = getLastDayOfWeek();
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
    const lastDay = getLastDayOfWeek();
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
