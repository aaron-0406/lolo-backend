import { Request, Response, NextFunction } from "express";
import JudicialCourtService from "../../app/judicial/services/judicial-court.service";

const service = new JudicialCourtService();

export const getJudicialCourtController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialCourts = await service.findAll();
    res.json(judicialCourts);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCourtByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialCourts = await service.findAllByCHB(Number(chb));
    res.json(judicialCourts);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCourtByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialCourt = await service.findByID(id);
    res.json(judicialCourt);
  } catch (error) {
    next(error);
  }
};

export const createJudicialCourtController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialCourt = await service.create(body);
    res.status(201).json(newJudicialCourt);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialCourtController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialCourt = await service.update(id, body);
    res.json(judicialCourt);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialCourtController = async (
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
