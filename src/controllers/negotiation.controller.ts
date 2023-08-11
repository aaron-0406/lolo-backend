import { Request, Response, NextFunction } from "express";
import NegotiationService from "../app/boss/services/negotiation.service";
const service = new NegotiationService();

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

export const getNegotiationsQueryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rta, quantity } = await service.findAllOpts(req.query);
    res.json({ rta, quantity });
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
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
