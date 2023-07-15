import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";

const { models } = sequelize;

class GoalUserService {
  constructor() {}

  async updateGoalUser(idGoalUser: number, quantity: number) {
    const goalUser = await models.GOAL_USER.findByPk(idGoalUser);
    if (goalUser)
      await goalUser.update({
        quantity,
      });
  }
}

export default GoalUserService;
