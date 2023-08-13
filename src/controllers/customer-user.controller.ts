import { Request, Response, NextFunction } from "express";
import CustomerUserService from "../app/customers/services/customer-user.service";
const service = new CustomerUserService();

export const getCustomerUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customersBanks = await service.findAll();
    res.json(customersBanks);
  } catch (error) {
    next(error);
  }
};

export const getCustomerUserByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const users = await service.findAllByCustomerID(customerId);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getCustomerUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createCustomerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateCustomerUserStateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.updateState(id, body.state);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateCustomerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
