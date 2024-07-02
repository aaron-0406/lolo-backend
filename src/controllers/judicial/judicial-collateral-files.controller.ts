import { Request, Response, NextFunction } from "express";
import JudicialCollateralFilesService from "../../app/judicial/services/judicial-collateral-files.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialCollateralFilesModel from "../../db/models/judicial-collateral-files.model";

const service = new JudicialCollateralFilesService();
const userLogService = new UserLogService();
const { JUDICIAL_COLLATERAL_FILES_TABLE } = judicialCollateralFilesModel;

export const findAllCollateralFilesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collateralFiles = await service.findAll();
    res.json(collateralFiles);
  } catch (error) {
    next(error);
  }
};

export const findCollateralFileByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const collateralFile = await service.findByID(id);
    res.json(collateralFile);
  } catch (error) {
    next(error);
  }
};

export const createCollateralFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newCollateralFile = await service.create(body);

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-02",
      entity: JUDICIAL_COLLATERAL_FILES_TABLE,
      entityId: Number(newCollateralFile.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });
    res.json(newCollateralFile);
  } catch (error) {
    next(error);
  }
};

export const updateCollateralFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const collateralFile = await service.update(id, body);

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-03",
      entity: JUDICIAL_COLLATERAL_FILES_TABLE,
      entityId: Number(collateralFile.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(collateralFile);
  } catch (error) {
    next(error);
  }
};

export const deletedCollateralFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const collateralFile = await service.delete(id);

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-04",
      entity: JUDICIAL_COLLATERAL_FILES_TABLE,
      entityId: Number(collateralFile.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(collateralFile);
  } catch (error) {
    next(error);
  }
};
