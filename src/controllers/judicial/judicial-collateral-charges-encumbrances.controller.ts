import { Request, Response, NextFunction } from "express";
import JudicialCollateralChargesEncumbrancesService from "../../app/judicial/services/judicial-collateral-charges-encumbrances.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialCollateralChargesEncumbrancesModel from "../../db/models/judicial-collateral-charges-encumbrances.model";

const service = new JudicialCollateralChargesEncumbrancesService();
const userLogService = new UserLogService();
const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE } = judicialCollateralChargesEncumbrancesModel

export const getAllChargesEncumbrancesByCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collateralId } = req.params;
    const collateralChargesEncumbrances = await service.findAllByCollateralId(Number(collateralId));
    res.json(collateralChargesEncumbrances);
  } catch (error) {
    next(error);
  }
}

export const getCollateralChargesEncumbrancesByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const collateralChargesEncumbrances = await service.findByID(id);
    res.json(collateralChargesEncumbrances);
  } catch (error) {
    next(error);
  }
}

export const createCollateralChargesEncumbrancesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newCollateralChargesEncumbrances = await service.create(body);

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-02-01",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
      entityId: Number(newCollateralChargesEncumbrances.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })
    res.json(newCollateralChargesEncumbrances);
  } catch (error) {
    next(error);
  }
}

export const updateCollateralChargesEncumbrancesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const collateralChargesEncumbrances = await service.update(id, body);
    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-02-02",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
      entityId: Number(collateralChargesEncumbrances.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })

    res.json(collateralChargesEncumbrances);
  } catch (error) {
    next(error);
  }
}

export const deleteCollateralChargesEncumbrancesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const collateralChargesEncumbrances = await service.delete(id);
    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-02-03",
      entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })

    res.json(collateralChargesEncumbrances);
  } catch (error) {
    next(error);
  }
}