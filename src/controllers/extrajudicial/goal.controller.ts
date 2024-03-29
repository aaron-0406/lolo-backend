import { NextFunction, Request, Response } from "express";
import GoalService from "../../app/extrajudicial/services/goal.service";
import GoalUserService from "../../app/extrajudicial/services/goal-user.service";
import boom from "@hapi/boom";
import UserLogService from "../../app/dash/services/user-log.service";
import goalModel from "../../db/models/goal.model";

const goalService = new GoalService();
const goalUserService = new GoalUserService();
const serviceUserLog = new UserLogService();

const { GOAL_TABLE } = goalModel;

export const createGoalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalService.create({
      ...req.body,
      customerId: Number(req.user?.customerId),
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P04-01",
      entity: GOAL_TABLE,
      entityId: Number(goal.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    return res.json(goal);
  } catch (error) {
    next(error);
  }
};

export const getGoalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page } = req.query;
    const limite = Number(limit);
    const pagina = Number(page);

    const goals = await goalService.findAll(Number(req.user?.customerId), {
      limit: limite,
      page: pagina,
    });

    return res.json(goals);
  } catch (error) {
    next(error);
  }
};

export const getGoalByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalService.findByID(
      Number(req.params.id),
      Number(req.user?.customerId)
    );
    return res.json(goal);
  } catch (error) {
    next(error);
  }
};
export const getGoalGlobalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalService.finGlobalGoal(Number(req.user?.customerId));
    if (!goal) throw boom.notFound("Meta no encontrada");
    return res.json(goal);
  } catch (error) {
    next(error);
  }
};

export const getCustomerUsersGoals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerUsers = await goalService.findCustomerUserByGoalId(
      Number(req.params.goalId)
    );
    return res.json(customerUsers);
  } catch (error) {
    next(error);
  }
};

export const getCustomerUserGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerGoal = await goalService.findGoalUserByCustomerId(
      Number(req.user?.id)
    );
    return res.json(customerGoal);
  } catch (error) {
    next(error);
  }
};

export const updateCustomerUserGoals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      const element = req.body[i];
      await goalUserService.updateGoalUser(element.id, element.quantity);
    }
    const goal = await goalService.findByID(
      Number(req.params.goalId),
      Number(req.user?.customerId)
    );

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P04-04",
      entity: GOAL_TABLE,
      entityId: Number(goal.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(goal);
  } catch (error) {
    next(error);
  }
};

export const updateGoalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalService.update(
      Number(req.params.id),
      Number(req.user?.customerId),
      req.body
    );

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P04-02",
      entity: GOAL_TABLE,
      entityId: Number(goal.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    return res.json(goal);
  } catch (error) {
    next(error);
  }
};

export const deleteGoalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalService.delete(Number(req.params.id));

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P04-03",
      entity: GOAL_TABLE,
      entityId: Number(goal.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    return res.json(goal);
  } catch (error) {
    next(error);
  }
};
