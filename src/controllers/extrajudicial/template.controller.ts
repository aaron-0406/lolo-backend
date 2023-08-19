import { Request, Response, NextFunction } from "express";
import TemplateService from "../../app/extrajudicial/services/template.service";

const service = new TemplateService();

export const getTemplateByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const template = await service.findAllByCustomerId(id);
    res.json(template);
  } catch (error) {
    next(error);
  }
};

export const getTemplateByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const template = await service.findOne(id);

    res.json(template);
  } catch (error) {
    next(error);
  }
};
