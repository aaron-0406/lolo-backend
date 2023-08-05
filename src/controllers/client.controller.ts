import { Request, Response, NextFunction } from "express";
import ClientService from "../app/extrajudicial/services/client.service";
import * as fs from "fs";

const service = new ClientService();

export const getAllClientsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await service.findAll();
    res.json(clients);
  } catch (error) {
    next(error);
  }
};

export const downloadExcelDailyManagementController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, cityId } = req.query;
    const newDate: any = date;
    const newCityId: any = cityId;

    const filePath = await service.readAndUpdateExcelFile(newDate, newCityId);
    res.sendFile(filePath, (err) => {
      if (err) {
        next(err);
      } else {
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getClientsByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const { clients, quantity } = await service.findAllCHB(chb, req.query);
    res.json({ clients, quantity });
  } catch (error) {
    next(error);
  }
};

export const getClientsByCHBDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const clients = await service.findAllCHBDetails(chb);
    res.json(clients);
  } catch (error) {
    next(error);
  }
};

export const getClientByCodeCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, chb } = req.params;
    const client = await service.findCode(code, chb);
    res.json(client);
  } catch (error) {
    next(error);
  }
};

export const createClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newClient = await service.create(body, Number(req.params.idCustomer));
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
};

export const updateClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, chb } = req.params;
    const body = req.body;
    const client = await service.update(code, chb, body);
    res.json(client);
  } catch (error) {
    next(error);
  }
};

export const deleteClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, chb, idCustomer } = req.params;
    await service.delete(code, chb, Number(idCustomer));
    res.status(201).json({ code, chb });
  } catch (error) {
    next(error);
  }
};
