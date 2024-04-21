import { Request, Response, NextFunction } from "express";
import ExtContactService from "../../app/extrajudicial/services/ext-contact.service";
import UserLogService from "../../app/dash/services/user-log.service";
import extContactsModel from "../../db/models/ext-contacts.model";

const service = new ExtContactService();
const serviceUserLog = new UserLogService();

const { EXT_CONTACT_TABLE } = extContactsModel;

export const getExtContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const extContacts = await service.findAll();
    res.json(extContacts);
  } catch (error) {
    next(error);
  }
};

export const getExtContactClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const extContacts = await service.findAllByClient(clientId);
    res.json(extContacts);
  } catch (error) {
    next(error);
  }
};

export const getExtContactByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const extContact = await service.findByID(id);
    res.json(extContact);
  } catch (error) {
    next(error);
  }
};

export const createExtContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newExtContact = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-07-01",
      entity: EXT_CONTACT_TABLE,
      entityId: Number(newExtContact.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newExtContact);
  } catch (error) {
    next(error);
  }
};

export const updateContactStateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const extContact = await service.updateState(id, body.state);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-07-04",
      entity: EXT_CONTACT_TABLE,
      entityId: Number(extContact.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(extContact);
  } catch (error) {
    next(error);
  }
};

export const updateExtContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const extContact = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-07-02",
      entity: EXT_CONTACT_TABLE,
      entityId: Number(extContact.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(extContact);
  } catch (error) {
    next(error);
  }
};

export const deleteExtContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-07-03",
      entity: EXT_CONTACT_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
