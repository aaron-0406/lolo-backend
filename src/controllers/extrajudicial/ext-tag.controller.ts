import { Request, Response, NextFunction } from "express";
import ExtTagService from "../../app/extrajudicial/services/ext-tag.service";
import UserLogService from "../../app/dash/services/user-log.service";
import extTagModel from "../../db/models/ext-tag.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new ExtTagService();
const serviceUserLog = new UserLogService();

const { EXT_TAG_TABLE } = extTagModel;

export const getExtTagsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const extTags = await service.findAll();
    res.json(extTags);
  } catch (error) {
    next(error);
  }
};

export const getExtTagsByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const extTags = await service.findAllByCHB(chb);
    res.json(extTags);
  } catch (error) {
    next(error);
  }
};

export const getExtTagsByCHBAndTagGroupIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb, tagGroupId } = req.params;
    const extTags = await service.findAllByCHBAndTagGroupId(chb, tagGroupId);
    res.json(extTags);
  } catch (error) {
    next(error);
  }
};

export const getExtTagByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const extTag = await service.findByID(id);
    res.json(extTag);
  } catch (error) {
    next(error);
  }
};

export const createExtTagController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newExtTag = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newExtTag.dataValues.id,
      newData: newExtTag.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-01",
      entity: EXT_TAG_TABLE,
      entityId: Number(newExtTag.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json(newExtTag);
  } catch (error) {
    next(error);
  }
};

export const updateExtTagController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldExtTag, newExtTag } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newExtTag.dataValues.id,
      oldData: oldExtTag,
      newData: newExtTag.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-02",
      entity: EXT_TAG_TABLE,
      entityId: Number(newExtTag.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newExtTag);
  } catch (error) {
    next(error);
  }
};

export const updateExtTagActionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldExtTag, newExtTag } = await service.updateAction(id, body.action);

    const sumary = generateLogSummary({
      method: req.method,
      id: newExtTag.dataValues.id,
      oldData: oldExtTag,
      newData: newExtTag.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-02",
      entity: EXT_TAG_TABLE,
      entityId: Number(newExtTag.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newExtTag);
  } catch (error) {
    next(error);
  }
};

export const deleteExtTagController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldExtTag = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldExtTag,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-03",
      entity: EXT_TAG_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
