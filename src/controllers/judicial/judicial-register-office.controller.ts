import { Request, Response, NextFunction } from "express";
import JudicialRegisterOfficeService from "../../app/judicial/services/judicial-register-office.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialRegisterOfficeModel from "../../db/models/judicial-register-office.model";

const service = new JudicialRegisterOfficeService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_REGISTER_OFFICE_TABLE } = judicialRegisterOfficeModel;

export const findRegisterOfficeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const registerOffice = await service.findByID(id);
    res.json(registerOffice);
  } catch (error) {
    next(error);
  }
};

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
};

export const createRegisterOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newRegisterOffice = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P40-01",
      entity: JUDICIAL_REGISTER_OFFICE_TABLE,
      entityId: Number(newRegisterOffice.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(newRegisterOffice);
  } catch (error) {
    next(error);
  }
};

export const updateRegisterOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const registerOffice = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P40-02",
      entity: JUDICIAL_REGISTER_OFFICE_TABLE,
      entityId: Number(registerOffice.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(registerOffice);
  } catch (error) {
    next(error);
  }
};

export const deletedRegisterOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const registerOffice = await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P40-03",
      entity: JUDICIAL_REGISTER_OFFICE_TABLE,
      entityId: Number(registerOffice.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(registerOffice);
  } catch (error) {
    next(error);
  }
};
