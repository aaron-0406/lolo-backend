import { Request, Response, NextFunction } from "express";
import JudicialCollateralChargesEncumbrancesTypeLoadService from "../../app/judicial/services/judicial-collateral-charges-encumbrances-type-load.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialCollateralChargesEncumbrancesTypeLoadModel from "../../db/models/judicial-collateral-charges-encumbrances-type-load.model";

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

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P42-01",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      entityId: Number(newCollateralChargesEncumbrancesTypeLoad.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
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
    const collateralChargesEncumbrancesTypeLoad = await service.update(
      id,
      body
    );
    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P42-02",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      entityId: Number(collateralChargesEncumbrancesTypeLoad.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(collateralChargesEncumbrancesTypeLoad);
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
    const collateralChargesEncumbrancesTypeLoad = await service.delete(id);

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P42-03",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      entityId: Number(collateralChargesEncumbrancesTypeLoad.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(collateralChargesEncumbrancesTypeLoad);
  } catch (error) {
    next(error);
  }
};
