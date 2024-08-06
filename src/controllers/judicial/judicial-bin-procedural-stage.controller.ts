import { Request, Response, NextFunction } from "express";
import { generateLogSummary } from "../../utils/dash/user-log";
import JudicialBinProceduralStageService from "../../app/judicial/services/judicial-bin-procedural-stage.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialBinProceduralStageModel from "../../db/models/judicial-bin-procedural-stage.model";

const service = new JudicialBinProceduralStageService();
const serviceUserLog = new UserLogService();
const { JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE } = judicialBinProceduralStageModel;

export const getJudicialBinProceduralStageByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialBinProceduralStages = await service.findAllByCHB(Number(chb));
    res.json(judicialBinProceduralStages);
  } catch (error) {
    next(error);
  }
};

export const getJudicialBinProceduralStageByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialBinProceduralStage = await service.findByID(id);
    res.json(judicialBinProceduralStage);
  } catch (error) {
    next(error);
  }
};

export const createJudicialBinProceduralStageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialBinProceduralStage = await service.create(body);
    const { visible } = req.query;

    const sumary = generateLogSummary({
      method: req.method,
      newData: newJudicialBinProceduralStage.dataValues,
      name: newJudicialBinProceduralStage.dataValues.name,
      id: newJudicialBinProceduralStage.dataValues.id,
    });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P24-01",
        entity: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
        entityId: Number(newJudicialBinProceduralStage.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });

    res.status(201).json(newJudicialBinProceduralStage);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialBinProceduralStageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldData, newData } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldData,
      newData: newData,
      id: Number(id),
    });
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P24-02",
        entity: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
        entityId: Number(id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });

    res.json(newData);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialBinProceduralStageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { oldData } = await service.delete(id);

    const { visible } = req.query;

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldData,
      id: Number(id),
    });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P24-03",
        entity: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
        entityId: Number(id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });

    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};
