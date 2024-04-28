import { Request, Response, NextFunction } from "express";
import JudicialBinFileService from "../../app/judicial/services/judicial-bin-file.service";

const service = new JudicialBinFileService();

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
