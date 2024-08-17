import { Request, Response, NextFunction } from "express";
import TariffService from "../../app/settings/services/tariff.service";
const service = new TariffService();

export const getTariffsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await service.findAll()
  res.status(200).json(data);
};
