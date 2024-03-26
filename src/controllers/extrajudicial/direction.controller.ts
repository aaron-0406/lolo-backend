import { Request, Response, NextFunction } from "express";
import DirectionService from "../../app/extrajudicial/services/direction.service";
import UserLogService from "../../app/dash/services/user-log.service";
import directionModel from "../../db/models/direction.model";

const service = new DirectionService();
const serviceUserLog = new UserLogService();

const { DIRECTION_TABLE } = directionModel;

export const getAllDirectionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const directions = await service.findAll();
    res.json(directions);
  } catch (error) {
    next(error);
  }
};

export const getDirectionByClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const directions = await service.findAllByClient(clientId);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P02-02-05-04",
        entity: DIRECTION_TABLE,
        entityId: Number(clientId),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(directions);
  } catch (error) {
    next(error);
  }
};

export const getDirectionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const direction = await service.findByID(id);
    res.json(direction);
  } catch (error) {
    next(error);
  }
};

export const createDirectionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newDirection = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-05-01",
      entity: DIRECTION_TABLE,
      entityId: Number(newDirection.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newDirection);
  } catch (error) {
    next(error);
  }
};

export const updateDirectionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const direction = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-05-02",
      entity: DIRECTION_TABLE,
      entityId: Number(direction.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(direction);
  } catch (error) {
    next(error);
  }
};

export const deleteDirectionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-05-03",
      entity: DIRECTION_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
