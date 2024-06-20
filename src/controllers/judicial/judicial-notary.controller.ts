import { Request, Response, NextFunction } from "express";
import JudicialNotaryService from "../../app/judicial/services/judicial-notary.service";

const service = new JudicialNotaryService();

export const findAllNotariesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notaries = await service.findAll();
    res.json(notaries);
  } catch (error) {
    next(error);
  }
}

export const findAllNotariesByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const notaries = await service.findAllByCHB(parseInt(chb));
    res.json(notaries);
  } catch (error) {
    next(error);
  }
}

export const createNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newNotary = await service.create(body);
    res.json(newNotary);
  } catch (error) {
    next(error);
  }
}

export const updateNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const notary = await service.update(id, body);
    res.json(notary);
  } catch (error) {
    next(error);
  }
}

export const deletedNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const notary = await service.delete(id);
    res.json(notary);
  } catch (error) {
    next(error);
  }
}   