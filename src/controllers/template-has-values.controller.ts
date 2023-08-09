import { Request, Response, NextFunction } from "express";
import TemplateHasValuesService from "../app/customers/services/template-has-values.service";
import ValuesService from "../app/customers/services/values.service";
import { ValuesType } from "../app/customers/types/values.type";

const service = new TemplateHasValuesService();
const serviceValues = new ValuesService();

export const getTemplateHasValuesByTemplateIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const templateHasValues = await service.findAll(id);
    res.json(templateHasValues);
  } catch (error) {
    next(error);
  }
};

export const getTemplateHasValuesByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const tenpmateGasValues = await service.findByCustomerId(id);
    res.json(tenpmateGasValues);
  } catch (error) {
    next(error);
  }
};

export const createTemplateHasValuesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name, templateId, values },
    } = req;
    const newTemplateHasValues = await service.create({ name, templateId });
    const valuesSaved = [];

    for (let i = 0; i < values.length; i++) {
      const element = values[i] as ValuesType;
      element.templateHasValuesId = newTemplateHasValues.dataValues.id;
      const newValue = await serviceValues.createValue(element);
      valuesSaved.push(newValue);
    }

    res.status(201).json({
      template_has_values: newTemplateHasValues,
      values: valuesSaved,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTemplateHasValues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      body: { name, values },
    } = req;
    const tenpmateHasValues = await service.update(id, name);
    for (let i = 0; i < values.length; i++) {
      const element = values[i] as ValuesType;
      await serviceValues.update(element.id, element);
    }
    res.json({
      template_has_values: tenpmateHasValues,
      values: values,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTemplateHasValues = async (
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
