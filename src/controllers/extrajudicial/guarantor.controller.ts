import { Request, Response, NextFunction } from "express";
import GuarantorService from "../../app/extrajudicial/services/guarantor.service";
import UserLogService from "../../app/dash/services/user-log.service";
import guarantorModel from "../../db/models/guarantor.model";

const service = new GuarantorService();
const serviceUserLog = new UserLogService();

const { GUARANTOR_TABLE } = guarantorModel;

export const getGuarantorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guarantors = await service.findAll();
    res.json(guarantors);
  } catch (error) {
    next(error);
  }
};

export const getGuarantorByClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const guarantors = await service.findAllByClient(clientId);
    res.json(guarantors);
  } catch (error) {
    next(error);
  }
};

export const getGuarantorByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const guarantor = await service.findByID(id);
    res.json(guarantor);
  } catch (error) {
    next(error);
  }
};

export const createGuarantorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newGuarantor = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-04-01",
      entity: GUARANTOR_TABLE,
      entityId: Number(newGuarantor.dataValues.id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newGuarantor);
  } catch (error) {
    next(error);
  }
};

export const updateGuarantorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const guarantor = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-04-02",
      entity: GUARANTOR_TABLE,
      entityId: Number(guarantor.dataValues.id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

    res.json(guarantor);
  } catch (error) {
    next(error);
  }
};

export const deleteGuarantorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-04-03",
      entity: GUARANTOR_TABLE,
      entityId: Number(id),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
