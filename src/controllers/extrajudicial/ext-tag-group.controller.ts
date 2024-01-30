import { Request, Response, NextFunction } from "express";
import ExtTagGroupService from "../../app/extrajudicial/services/ext-tag-group.service";
import UserLogService from "../../app/dash/services/user-log.service";
import extTagGroupModel from "../../db/models/ext-tag-group.model";

const service = new ExtTagGroupService();
const serviceUserLog = new UserLogService();

const { EXT_TAG_GROUP_TABLE } = extTagGroupModel;

export const getExtTagGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const extTagGroups = await service.findAll();
    res.json(extTagGroups);
  } catch (error) {
    next(error);
  }
};

export const getExtTagGroupByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const extTagGroups = await service.findAllByCHB(chb);
    res.json(extTagGroups);
  } catch (error) {
    next(error);
  }
};

export const getExtTagGroupByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const extTagGroup = await service.findByID(id);
    res.json(extTagGroup);
  } catch (error) {
    next(error);
  }
};

export const createExtTagGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newExtTagGroup = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-07-01", // TODO: Changing permission code
      entity: EXT_TAG_GROUP_TABLE,
      entityId: Number(newExtTagGroup.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newExtTagGroup);
  } catch (error) {
    next(error);
  }
};

export const updateExtTagGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const extTagGroup = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-07-02", // TODO: Changing permission code
      entity: EXT_TAG_GROUP_TABLE,
      entityId: Number(extTagGroup.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(extTagGroup);
  } catch (error) {
    next(error);
  }
};

export const deleteExtTagGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-07-03", // TODO: Changing permission code
      entity: EXT_TAG_GROUP_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
