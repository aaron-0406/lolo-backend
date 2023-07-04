import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";

import { GoalType } from "../types/goal.type";

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
    const newGoal = await models.GOAL.create(data);
    return newGoal;
  }

  async update(id: number, customerId: number, changes: GoalType) {
    const goal = await this.findByID(id, customerId);
    const rta = await goal.update(changes);
    return rta;
  }

  async delete(id: number, customerId: number) {
    const goal = await this.findByID(id, customerId);
    await goal.destroy();
    return { id };
  }
}

export default GoalService;
