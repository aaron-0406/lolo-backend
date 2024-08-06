import { Request, Response, NextFunction } from "express";
import NegotiationService from "../../app/dash/services/negotiation.service";
import UserLogService from "../../app/dash/services/user-log.service";
import negotiationModel from "../../db/models/negotiation.model";
import { generateLogSummary } from "../../utils/dash/user-log";

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

    const sumary = generateLogSummary({
      method: req.method,
      id: newNegotiation.dataValues.id,
      newData: newNegotiation.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P09-01",
      entity: NEGOTIATION_TABLE,
      entityId: Number(newNegotiation.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
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
    const { oldNegotiation, newNegotiation } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newNegotiation.dataValues.id,
      oldData: oldNegotiation,
      newData: newNegotiation.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P09-02",
      entity: NEGOTIATION_TABLE,
      entityId: Number(newNegotiation.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newNegotiation);
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
    const oldNegotiation = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldNegotiation,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P09-03",
      entity: NEGOTIATION_TABLE,
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
