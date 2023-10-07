import { Request, Response, NextFunction } from "express";
import CustomerUserService from "../../app/dash/services/customer-user.service";
import UserLogService from "../../app/dash/services/user-log.service";
import customerUserModel from "../../db/models/customer-user.model";

const service = new CustomerUserService();
const serviceUserLog = new UserLogService();

const { CUSTOMER_USER_TABLE } = customerUserModel;

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-01",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(newUser.dataValues.id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-04",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(user.dataValues.id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

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
    if (!req.body.password && req.body.password != "") delete req.body.password;
    const user = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-02",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(user.dataValues.id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-03",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
