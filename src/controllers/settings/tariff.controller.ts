import { Request, Response, NextFunction } from "express";
import TariffService from "../../app/settings/services/tariff.service";
const service = new TariffService();

export const getTariffsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chb } = req.params;
  const data = await service.findAll( Number(chb) );
  res.status(200).json(data);
};

export const createTariffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await service.create(req.body);
  res.status(200).json(data);
};

export const updateTariffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = await service.update(Number(id), req.body);
  res.status(200).json(data);
};

export const deleteTariffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = await service.delete(id);
  res.status(200).json(data);
};