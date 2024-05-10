import { Request, Response, NextFunction } from "express";
import judicialProcessReasonService from "../../app/judicial/services/judicial-process-reason.service";

const service = new judicialProcessReasonService();

export const getJudicialProcessReasonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialProcessReason = await service.findAll();
    res.json(judicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const getJudicialProcessReasonByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialJudicialProcessReason = await service.findAllByCHB(Number(chb));
    res.json(judicialJudicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const getJudicialProcessReasonByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialProcessReason = await service.findByID(Number(id));
    res.json(judicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const createJudicialProcessReasonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialProcessReason = await service.create(body);
    res.status(201).json(newJudicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialProcessReasonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialProcessReason = await service.update(Number(id), body);
    res.json(judicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialProcessReasonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(Number(id));
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
