import { Request, Response, NextFunction } from "express";
import JudicialCaseFileService from "../../app/judicial/services/judicial-case-file.service";
const service = new JudicialCaseFileService();

export const getJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const caseFiles = await service.findAll();
    res.json(caseFiles);
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
    const caseFiles = await service.findAllByClient(clientId);
    res.json(caseFiles);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCaseFileByNumberCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    const caseFile = await service.findByNumberCaseFile(code);
    res.json(caseFile);
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
    const caseFile = await service.findByID(id);
    res.json(caseFile);
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
    const caseFile = await service.update(id, body);
    res.json(caseFile);
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
