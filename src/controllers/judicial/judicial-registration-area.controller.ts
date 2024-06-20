import { Request, Response, NextFunction } from "express";
import JudicialRegistrationAreaService from "../../app/judicial/services/judicial-registration-area.service";

const service = new JudicialRegistrationAreaService();

export const findAllRegistrationAreasController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registrationAreas = await service.findAll();
    res.json(registrationAreas);
  } catch (error) {
    next(error);
  }
}

export const findAllRegistrationAreasByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const registrationAreas = await service.findAllByCHB(parseInt(chb));
    res.json(registrationAreas);
  } catch (error) {
    next(error);
  }
}

export const createRegistrationAreaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newRegistrationArea = await service.create(body);
    res.json(newRegistrationArea);
  } catch (error) {
    next(error);
  }
}


export const updateRegistrationAreaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const registrationArea = await service.update(id, body);
    res.json(registrationArea);
  } catch (error) {
    next(error);
  }
}

export const deletedRegistrationAreaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const registrationArea = await service.delete(id);
    res.json(registrationArea);
  } catch (error) {
    next(error);
  }
}   