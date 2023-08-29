import { Request, Response, NextFunction } from "express";
import JudicialCaseFileService from "../../app/extrajudicial/services/judicial-case-file.service";
const service = new JudicialCaseFileService();

export const getJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guarantors = await service.findAll();
    res.json(guarantors);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCaseFileByClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const guarantors = await service.findAllByClient(clientId);
    res.json(guarantors);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCaseFileByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const guarantor = await service.findByID(id);
    res.json(guarantor);
  } catch (error) {
    next(error);
  }
};

export const createJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialCaseFile = await service.create(body);
    res.status(201).json(newJudicialCaseFile);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const guarantor = await service.update(id, body);
    res.json(guarantor);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
