import { Request, Response, NextFunction } from "express";
import ExtTagService from "../../app/extrajudicial/services/ext-tag.service";
import UserLogService from "../../app/dash/services/user-log.service";
import extTagModel from "../../db/models/ext-tag.model";

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
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P14-04",
        entity: EXT_TAG_TABLE,
        entityId: Number(req.user?.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-01",
      entity: EXT_TAG_TABLE,
      entityId: Number(newExtTag.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
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
    const extTag = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-02",
      entity: EXT_TAG_TABLE,
      entityId: Number(extTag.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(extTag);
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
    const extTag = await service.updateAction(id, body.action);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-02",
      entity: EXT_TAG_TABLE,
      entityId: Number(extTag.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(extTag);
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
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-03",
      entity: EXT_TAG_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
