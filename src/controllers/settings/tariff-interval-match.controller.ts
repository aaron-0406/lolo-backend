import { Request, Response, NextFunction } from "express";
import TariffIntervalMatchService from "../../app/settings/services/tariff-interval-match.service";
const service = new TariffIntervalMatchService();

export const getTariffIntervalMatchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await service.findAll();
  res.status(200).json(data);
};