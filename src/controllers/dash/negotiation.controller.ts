import { Request, Response, NextFunction } from "express";
import NegotiationService from "../../app/dash/services/negotiation.service";
import UserLogService from "../../app/dash/services/user-log.service";
import negotiationModel from "../../db/models/negotiation.model";

const service = new NegotiationService();
const serviceUserLog = new UserLogService();
const { NEGOTIATION_TABLE } = negotiationModel;

export const getNegotiationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const negotiations = await service.findAll();
    res.json(negotiations);
  } catch (error) {
    next(error);
  }
};

export const getNegotiationsByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const negotiations = await service.findAllByCHB(chb);
    res.json(negotiations);
  } catch (error) {
    next(error);
  }
};

export const getNegotiationsByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const negotiation = await service.findOne(id);
    res.json(negotiation);
  } catch (error) {
    next(error);
  }
};

export const createNegotiationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newNegotiation = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P09-01",
      entity: NEGOTIATION_TABLE,
      entityId: Number(newNegotiation.dataValues.id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newNegotiation);
  } catch (error) {
    next(error);
  }
};

export const updateNegotiationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const negotiation = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P09-02",
      entity: NEGOTIATION_TABLE,
      entityId: Number(negotiation.dataValues.id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

    res.json(negotiation);
  } catch (error) {
    next(error);
  }
};

export const deleteNegotiationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P09-03",
      entity: NEGOTIATION_TABLE,
      entityId: Number(id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
