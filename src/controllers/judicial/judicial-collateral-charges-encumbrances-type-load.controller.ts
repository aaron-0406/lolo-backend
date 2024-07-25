import { Request, Response, NextFunction } from "express";
import JudicialCollateralChargesEncumbrancesTypeLoadService from "../../app/judicial/services/judicial-collateral-charges-encumbrances-type-load.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialCollateralChargesEncumbrancesTypeLoadModel from "../../db/models/judicial-collateral-charges-encumbrances-type-load.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new JudicialCollateralChargesEncumbrancesTypeLoadService();
const userLogService = new UserLogService();
const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE } =
  judicialCollateralChargesEncumbrancesTypeLoadModel;

export const getAllCollateralChargesEncumbrancesTypeLoadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const collateralChargesEncumbrancesTypeLoad = await service.findAll(chb);
    res.json(collateralChargesEncumbrancesTypeLoad);
  } catch (error) {
    next(error);
  }
};

export const getCollateralChargesEncumbrancesTypeLoadByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const collateralChargesEncumbrancesTypeLoad = await service.findByID(id);
    res.json(collateralChargesEncumbrancesTypeLoad);
  } catch (error) {
    next(error);
  }
};

export const createCollateralChargesEncumbrancesTypeLoadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newCollateralChargesEncumbrancesTypeLoad = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newCollateralChargesEncumbrancesTypeLoad.dataValues.id,
      newData: newCollateralChargesEncumbrancesTypeLoad.dataValues,
    });

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P42-01",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      entityId: Number(newCollateralChargesEncumbrancesTypeLoad.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newCollateralChargesEncumbrancesTypeLoad);
  } catch (error) {
    next(error);
  }
};

export const updateCollateralChargesEncumbrancesTypeLoadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldJudicialCollateralChargesEncumbrancesTypeLoad, newJudicialCollateralChargesEncumbrancesTypeLoad } = await service.update(
      id,
      body
    );

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialCollateralChargesEncumbrancesTypeLoad.dataValues.id,
      newData: newJudicialCollateralChargesEncumbrancesTypeLoad.dataValues,
      oldData: oldJudicialCollateralChargesEncumbrancesTypeLoad,
    });

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P42-02",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      entityId: Number(newJudicialCollateralChargesEncumbrancesTypeLoad.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newJudicialCollateralChargesEncumbrancesTypeLoad);
  } catch (error) {
    next(error);
  }
};

export const deletedCollateralChargesEncumbrancesTypeLoadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldCollateralChargesEncumbrancesTypeLoad = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: oldCollateralChargesEncumbrancesTypeLoad.id,
      oldData: oldCollateralChargesEncumbrancesTypeLoad,
    });

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P42-03",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      entityId: Number(oldCollateralChargesEncumbrancesTypeLoad.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json({ id });
  } catch (error) {
    next(error);
  }
};
