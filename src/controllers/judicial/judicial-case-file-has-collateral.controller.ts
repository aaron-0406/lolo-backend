import { Request, Response, NextFunction } from "express";
import UserLogService from "../../app/dash/services/user-log.service";
import JudicialCaseFileHasCollateralService from "../../app/judicial/services/judicial-case-file-has-collateral.service";
import judicialCaseFileHasCollateralModel from "../../db/models/judicial-case-file-has-collateral.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new JudicialCaseFileHasCollateralService();
const userLogService = new UserLogService();

const { JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE } =
  judicialCaseFileHasCollateralModel;

export const getAllRelatedCaseFileAssociatedToCollateral = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb, numberCaseFile, collateralId } = req.params;
    const collaterals = await service.findAllRelatedCaseFileAssingCollateral(
      numberCaseFile,
      collateralId,
      Number(chb)
    );
    res.json(collaterals);
  } catch (error) {
    next(error);
  }
};

export const assingCollateralToCaseFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collateralId } = req.params;
    const { newJudicialCasefileHasCollateral } = req.body;
    const {
      JudicialCaseFileHasCollateralsToDelete,
      JudicialCaseFileHasCollateralsToCreate,
      JudicialCaseFileHasCollateralWithoutChanges,
      data,
    } = await service.assingCollateralToCaseFile(
      newJudicialCasefileHasCollateral,
      collateralId
    );

    const sumary = generateLogSummary({
      method: req.method,
      id: collateralId,
      oldData: JudicialCaseFileHasCollateralsToDelete,
      newData: JudicialCaseFileHasCollateralsToCreate,
      withoutChanges: JudicialCaseFileHasCollateralWithoutChanges,
    })
    await userLogService.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-01",
      entity: JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
      entityId: Number(collateralId),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};
