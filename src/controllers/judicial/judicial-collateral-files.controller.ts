import { Request, Response, NextFunction } from "express";
import JudicialCollateralFilesService from "../../app/judicial/services/judicial-collateral-files.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialCollateralFilesModel from "../../db/models/judicial-collateral-files.model";

const service = new JudicialCollateralFilesService();
const userLogService = new UserLogService();
const { JUDICIAL_COLLATERAL_FILES_TABLE } = judicialCollateralFilesModel

export const getAllCollateralFilesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collateralId, chb } = req.params;
    const collateralFiles = await service.findAllByCollateralId(Number(collateralId), Number(chb));
    res.json(collateralFiles);
  } catch (error) {
    next(error);
  }
}

export const getCollateralFileByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, chb, collateralId } = req.params;
    const collateralFile = await service.findOne(Number(chb), Number(collateralId), Number(id));

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-03-01",
      entity: JUDICIAL_COLLATERAL_FILES_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })

    res.json(collateralFile);
  } catch (error) {
    next(error);
  }
}

export const createCollateralFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb, collateralId } = req.params;
    const { files } = req;

    const newCollateralFile = await service.create(
      files as [],
      Number(chb),
      Number(collateralId),
    );

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-03-02",
      entity: JUDICIAL_COLLATERAL_FILES_TABLE,
      entityId: Number(collateralId),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })
    res.json(newCollateralFile);
  } catch (error) {
    next(error);
  }
}


export const deletedCollateralFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, chb, collateralId } = req.params;
    const collateralFile = await service.delete(id, Number(chb), Number(collateralId));

    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-03-04",
      entity: JUDICIAL_COLLATERAL_FILES_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    })

    res.json(collateralFile);
  } catch (error) {
    next(error);
  }
}
