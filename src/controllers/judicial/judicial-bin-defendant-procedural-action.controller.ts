import { Request, Response, NextFunction } from "express";
import JudicialBinDefendantProceduralActionService from "../../app/judicial/services/judicial-bin-defendant-procedural-action.service";

const service = new JudicialBinDefendantProceduralActionService();

export const getJudicialBinDefendantProceduralActionByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialBinProceduralActions = await service.findAllByCHB(
      Number(chb)
    );
    res.json(judicialBinProceduralActions);
  } catch (error) {
    next(error);
  }
};

export const getJudicialBinDefendantProceduralActionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialBinProceduralAction = await service.findByID(id);
    res.json(judicialBinProceduralAction);
  } catch (error) {
    next(error);
  }
};

export const createJudicialBinDefendantProceduralActionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialBinDefendantProceduralAction = await service.create(body);
    res.status(201).json(newJudicialBinDefendantProceduralAction);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialBinDefendantProceduralActionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialBinProceduralAction = await service.update(id, body);
    res.json(judicialBinProceduralAction);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialBinDefendantProceduralActionController = async (
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
