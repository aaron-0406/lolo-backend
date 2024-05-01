import { Request, Response, NextFunction } from "express";
import JudicialBinTypeBinnacleService from "../../app/judicial/services/judicial-bin-type-binnacle.service";

const service = new JudicialBinTypeBinnacleService();

export const getJudicialBinTypeBinnacleByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialBinTypeBinnacles = await service.findAllByCHB(Number(chb));
    res.json(judicialBinTypeBinnacles);
  } catch (error) {
    next(error);
  }
};

export const getJudicialBinTypeBinnacleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialBinTypeBinnacle = await service.findByID(id);
    res.json(judicialBinTypeBinnacle);
  } catch (error) {
    next(error);
  }
};

export const createJudicialBinTypeBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialBinTypeBinnacle = await service.create(body);
    res.status(201).json(newJudicialBinTypeBinnacle);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialBinTypeBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialBinTypeBinnacle = await service.update(id, body);
    res.json(judicialBinTypeBinnacle);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialBinTypeBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};
