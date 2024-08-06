import { Request, Response, NextFunction } from "express";
import ClientService from "../../app/extrajudicial/services/client.service";
import * as fs from "fs";
import UserLogService from "../../app/dash/services/user-log.service";
import cityModel from "../../db/models/city.model";
import clientModel from "../../db/models/client.model";
import { ClientType } from "../../app/extrajudicial/types/client.type";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new ClientService();
const serviceUserLog = new UserLogService();

const { CITY_TABLE } = cityModel;
const { CLIENT_TABLE } = clientModel;

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-01",
      entity: CITY_TABLE,
      entityId: Number(cityId),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

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
    console.log(error)
    next(error);
  }
};

export const getClientsByNameOrCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const clients = await service.findByNameOrCode(chb, req.query);
    res.json(clients);
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

export const saveClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const permission = body.id === 0 ? "P02-03" : "P02-04";
    const client = await service.save(
      body,
      Number(req.params.idCustomer),
      req.user
    );

    const sumary = generateLogSummary ({
      method: req.method,
      newData: client.dataValues,
      id: client.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: permission,
      entity: CLIENT_TABLE,
      entityId: Number(client.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};

export const updateClientsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const body = req.body;
    const clients = await service.updateClients(body.clients, chb);

    clients.newClientsUpdates.forEach(async (client: any) => {
      const oldClient = clients.oldClientsUpdates.find((oldClient: any) => oldClient.id === client.dataValues.id);

      const sumary = generateLogSummary({
        method: req.method,
        oldData: oldClient,
        newData: client.dataValues,
        id: client.dataValues.id,
      });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P02-04",
        entity: CLIENT_TABLE,
        entityId: Number(client.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });
    });

    res.status(201).json(clients.newClientsUpdates);
  } catch (error) {
    next(error);
  }
}

export const transferClientToAnotherBankController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const body = req.body;

    const data = await service.transferToAnotherBank(
      body.code,
      chb,
      body.chbTransferred
    );

    const sumary = generateLogSummary({
      method: req.method,
      oldData: data.oldData,
      newData: data.newData,
      id: data.id,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-06",
      entity: CLIENT_TABLE,
      entityId: Number(body.code),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ id: data?.id, chbTransferred: data?.chbTransferred });
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
    const { client, id } = await service.delete(code, chb, Number(idCustomer));

    const sumary = generateLogSummary({
      method: req.method,
      oldData: client,
      id: client.id,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-05",
      entity: CLIENT_TABLE,
      entityId: Number(client.id ?? id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ code, chb, id: client.id });
  } catch (error) {
    next(error);
  }
};
