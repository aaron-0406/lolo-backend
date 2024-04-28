import { Request, Response, NextFunction } from "express";
import JudicialBinFileService from "../../app/judicial/services/judicial-bin-file.service";

const service = new JudicialBinFileService();

export const getJudicialBinFileByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialBinFiles = await service.findAllByCHB(Number(chb));
    res.json(judicialBinFiles);
  } catch (error) {
    next(error);
  }
};

export const getJudicialBinFileByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialBinFile = await service.findByID(id);
    res.json(judicialBinFile);
  } catch (error) {
    next(error);
  }
};

export const createJudicialBinFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialBinFile = await service.create(body);
    res.status(201).json(newJudicialBinFile);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialBinFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialBinFile = await service.update(id, body);
    res.json(judicialBinFile);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialBinFileController = async (
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
