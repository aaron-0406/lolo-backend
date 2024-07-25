import { Request, Response, NextFunction } from "express";
import JudicialCollateralService from "../../app/judicial/services/judicial-collateral.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialCollateralModel from "../../db/models/judicial-collateral.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new JudicialCollateralService();
const userLogService = new UserLogService();
const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel;

export const getCollateralByIDController = async (
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
};

export const getCollateralByJudicialCaseFileIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { JudicialCaseFileId } = req.params;
    const collateral = await service.findAllCollateralByCaseFile(
      JudicialCaseFileId
    );
    res.json(collateral);
  } catch (error) {
    next(error);
  }
};

export const createCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { JudicialCaseFileId } = req.params;
    const body = req.body;
    const newCollateral = await service.create(body, JudicialCaseFileId);

    const sumary = generateLogSummary({
      method: req.method,
      id: newCollateral.dataValues.id,
      newData: newCollateral.dataValues,
    })

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-02",
      entity: JUDICIAL_COLLATERAL_TABLE,
      entityId: Number(newCollateral.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });
    res.json(newCollateral);
  } catch (error) {
    next(error);
  }
};

export const updateCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldJudicialCollateral, newJudicialCollateral } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialCollateral.dataValues.id,
      oldData: oldJudicialCollateral,
      newData: newJudicialCollateral.dataValues,
    });

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-03",
      entity: JUDICIAL_COLLATERAL_TABLE,
      entityId: Number(newJudicialCollateral.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newJudicialCollateral);
  } catch (error) {
    next(error);
  }
};

export const deletedCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldJudicialCollateral = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldJudicialCollateral,
    });

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-04",
      entity: JUDICIAL_COLLATERAL_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(oldJudicialCollateral);
  } catch (error) {
    next(error);
  }
};
