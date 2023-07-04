import { NextFunction, Request, Response } from "express";
import GoalService from "../app/extrajudicial/services/goal.service";

const goalService = new GoalService();

export const createGoalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goals = await goalService.findAll(Number(req.user?.customerId));
    return res.json(goals);
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
    const goal = await goalService.findByID(
      Number(req.params.id),
      Number(req.user?.customerId)
    );
    return res.json(goal);
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
    const goal = await goalService.create(req.body);
    return res.json(goal);
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
    const goal = await goalService.delete(
      Number(req.params.id),
      Number(req.user?.customerId)
    );
    return res.json(goal);
  } catch (error) {
    next(error);
  }
};
