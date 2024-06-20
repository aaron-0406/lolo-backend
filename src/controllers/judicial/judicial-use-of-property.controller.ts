import { Request, Response, NextFunction } from "express";
import JudicialUseOfPropertyService from "../../app/judicial/services/judicial-use-of-property.service";

const service = new JudicialUseOfPropertyService();

export const findAllUseOfPropertiesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const useOfProperties = await service.findAll();
    res.json(useOfProperties);
  } catch (error) {
    next(error);
  }
}

export const findAllUseOfPropertiesByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const useOfProperties = await service.findAllByCHB(parseInt(chb));
    res.json(useOfProperties);
  } catch (error) {
    next(error);
  }
}

export const createUseOfPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newUseOfProperty = await service.create(body);
    res.json(newUseOfProperty);
  } catch (error) {
    next(error);
  }
}

export const updateUseOfPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const useOfProperty = await service.update(id, body);
    res.json(useOfProperty);
  } catch (error) {
    next(error);
  }
}


export const deletedUseOfPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const useOfProperty = await service.delete(id);
    res.json(useOfProperty);
  } catch (error) {
    next(error);
  }
}     