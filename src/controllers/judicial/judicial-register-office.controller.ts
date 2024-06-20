import { Request, Response, NextFunction } from "express";
import JudicialRegisterOfficeService from "../../app/judicial/services/judicial-register-office.service";

const service = new JudicialRegisterOfficeService();

export const findAllRegisterOfficesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerOffices = await service.findAll();
    res.json(registerOffices);
  } catch (error) {
    next(error);
  }
}

export const findAllRegisterOfficesByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const registerOffices = await service.findAllByCHB(parseInt(chb));
    res.json(registerOffices);
  } catch (error) {
    next(error);
  }
}


export const createRegisterOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newRegisterOffice = await service.create(body);
    res.json(newRegisterOffice);
  } catch (error) {
    next(error);
  }
}

export const updateRegisterOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const registerOffice = await service.update(id, body);
    res.json(registerOffice);
  } catch (error) {
    next(error);
  }
}

export const deletedRegisterOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const registerOffice = await service.delete(id);
    res.json(registerOffice);
  } catch (error) {
    next(error);
  }
}

