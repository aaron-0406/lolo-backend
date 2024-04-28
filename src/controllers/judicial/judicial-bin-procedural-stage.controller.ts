import { Request, Response, NextFunction } from "express";
import JudicialBinProceduralStageService from "../../app/judicial/services/judicial-bin-procedural-stage.service";

const service = new JudicialBinProceduralStageService();

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
    const judicialBinProceduralStage = await service.update(id, body);
    res.json(judicialBinProceduralStage);
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
    await service.delete(id);
    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};
