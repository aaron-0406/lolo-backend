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

class GoalService {
  constructor() {}
  async findAll(customerId: number) {
    const rta = await models.GOAL.findAll({
      where: {
        customerId,
      },
    });
    return rta;
  }

  async findByID(goalId: number, customerId: number) {
    const goal = await models.GOAL.findOne({
      where: {
        id_goal: goalId,
        customerId,
      },
    });

    if (!goal) throw boom.notFound("Meta no encontrada");
    return goal;
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

    const lastDay = getLastDayOfWeek();
    const lastDayWeeks = sumarDias(lastDay, (week - 1) * 7);
    const newGoal = await models.GOAL.create({
      ...data,
      startDate: firstDay,
      endDate: lastDayWeeks,
    });
    return newGoal;
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

    const lastDay = getLastDayOfWeek();
    const lastDayWeeks = sumarDias(lastDay, (week - 1) * 7);
    const goal = await this.findByID(id, customerId);
    const rta = await goal.update({
      ...changes,
      startDate: firstDay,
      endDate: lastDayWeeks,
    });
    return rta;
  }

  async delete(id: number, customerId: number) {
    const goal = await this.findByID(id, customerId);
    await goal.destroy();
    return { id };
  }
}

export default GoalService;
