import { Request, Response, NextFunction } from "express";
import ValuesService from "../../app/extrajudicial/services/values.service";

const service = new ValuesService();

export const getValuesByTemplateHasValuesIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const values = await service.findAllByTemplateHasValuesId(id);
    res.json(values);
  } catch (error) {
    next(error);
  }
};
