import { Request, Response, NextFunction } from "express";
import ECampoService from "../app/customers/services/ecampo.service";

const service = new ECampoService();

export const findECampoByTemplateIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ECampo = await service.findAllByTemplateId(id);
    res.json(ECampo);
  } catch (error) {
    next(error);
  }
};
