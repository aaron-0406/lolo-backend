import { Request, Response, NextFunction } from "express";
import TariffService from "../../app/settings/services/tariff.service";
import { generateLogSummary } from "../../utils/dash/user-log";
import UserLogService from "../../app/dash/services/user-log.service";
import tariffModel from "../../db/models/settings/tariff.model";

const { TARIFF_TABLE } = tariffModel;
const serviceUserLog = new UserLogService();
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

  const newTariff = await service.create(req.body);

  const sumary = generateLogSummary({
    method: req.method,
    id: newTariff?.dataValues.id ,
    newData: newTariff?.dataValues,
  })

  await serviceUserLog.create({
    customerId: Number(req.user?.customerId),
    customerUserId: Number(req.user?.id),
    codeAction: "P43-01",
    entity: TARIFF_TABLE,
    entityId: Number(newTariff?.dataValues.id),
    ip: req.clientIp ?? "",
    methodSumary: sumary,
  })

  res.status(200).json(newTariff);
};

export const updateTariffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { oldTariff, newTariff } = await service.update(Number(id), req.body);

  if(!oldTariff || !newTariff) return res.status(404).json({ message: "Tarifa no actualizada" });

  const sumary = generateLogSummary({
    method: req.method,
    id: id ,
    oldData: oldTariff,
    newData: newTariff?.dataValues,
  })
  await serviceUserLog.create({
    customerId: Number(req.user?.customerId),
    customerUserId: Number(req.user?.id),
    codeAction: "P43-02",
    entity: TARIFF_TABLE,
    entityId: Number(newTariff?.dataValues.id),
    ip: req.clientIp ?? "",
    methodSumary: sumary,
  })

  res.status(200).json(newTariff);
};

export const deleteTariffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = await service.delete(id);

  const sumary = generateLogSummary({
    method: req.method,
    id: id ,
    oldData: data?.dataValues,
  })
  await serviceUserLog.create({
    customerId: Number(req.user?.customerId),
    customerUserId: Number(req.user?.id),
    codeAction: "P43-03",
    entity: TARIFF_TABLE,
    entityId: Number(id),
    ip: req.clientIp ?? "",
    methodSumary: sumary,
  })

  res.status(200).json(id);
};