import { Request, Response, NextFunction } from "express";
import JudicialCollateralService from "../../app/judicial/services/judicial-collateral.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialCaseFileHasCollateralModel from "../../db/models/judicial-case-file-has-collateral.model";
import judicialCollateralModel from "../../db/models/judicial-collateral.model";

const service = new JudicialCollateralService();
const userLogService = new UserLogService();
const { JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE } = judicialCaseFileHasCollateralModel
const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel

export const findAllCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collaterals = await service.findAll();
    res.json(collaterals);
  } catch (error) {
    next(error);
  }
}

export const findAllCollateralByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const collaterals = await service.findAllByCHB(parseInt(chb));
    res.json(collaterals);
  } catch (error) {
    next(error);
  }
}

export const findCollateralByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const collateral = await service.findByID(id);
    res.json(collateral);
  } catch (error) {
    next(error);
  }
}

export const findCollateralByJudicialCaseFileIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { JudicialCaseFileId } = req.params;
    const collateral = await service.findAllCollateralByCaseFile(JudicialCaseFileId);
    res.json(collateral);
  } catch (error) {
    next(error);
  }
}

export const createCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { JudicialCaseFileId } = req.params;
    const body = req.body;
    const newCollateral = await service.create(body, JudicialCaseFileId);

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-02",
      entity: JUDICIAL_COLLATERAL_TABLE,
      entityId: Number(newCollateral.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })
    res.json(newCollateral);
  } catch (error) {
    next(error);
  }
}

export const updateCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const collateral = await service.update(id, body);
    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-03",
      entity: JUDICIAL_COLLATERAL_TABLE,
      entityId: Number(collateral.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })

    res.json(collateral);
  } catch (error) {
    next(error);
  }
}


export const deletedCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const collateral = await service.delete(id);

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-04",
      entity: JUDICIAL_COLLATERAL_TABLE,
      entityId: Number(collateral.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })

    res.json(collateral);
  } catch (error) {
    next(error);
  }
}


