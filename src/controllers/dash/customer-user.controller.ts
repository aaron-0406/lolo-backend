import { Request, Response, NextFunction } from "express";
import CustomerUserService from "../../app/dash/services/customer-user.service";
import UserLogService from "../../app/dash/services/user-log.service";
import customerUserModel from "../../db/models/customer-user.model";
import { generateLogSummary } from "../../utils/dash/user-log"

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

    const sumary = generateLogSummary({
      method: req.method,
      newData: newUser.dataValues,
      id: newUser.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-01",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(newUser.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
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
    const { oldUser, newUser } = await service.updateState(id, body.state);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldUser,
      newData: newUser.dataValues,
      id: newUser.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-04",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(newUser.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newUser);
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
    const { oldUser, newUser } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldUser,
      newData: newUser.dataValues,
      id: newUser.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-02",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(newUser.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newUser);

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
    const oldUser = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldUser,
      id: oldUser.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-03",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const removeCode2faController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const { id } = req.params;
    const { oldUser, newUser } = await service.removeCode2fa(id);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldUser,
      newData: newUser.dataValues,
      id: newUser.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P10-05",
      entity: CUSTOMER_USER_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json(newUser);
  }
  catch (error) {
    next(error);
  }
}
