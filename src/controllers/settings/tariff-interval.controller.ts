import { Request, Response, NextFunction } from "express";
import TariffIntervalService from "../../app/settings/services/tariff-interval.service";
const service = new TariffIntervalService();

export const getTariffIntervalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await service.findAll();
  res.status(200).json(data);
};  