import { Request, Response, NextFunction } from "express";
import FileService from "../../app/extrajudicial/services/file.service";
import UserLogService from "../../app/dash/services/user-log.service";
import fileModel from "../../db/models/file.model";

const service = new FileService();
const serviceUserLog = new UserLogService();

const { FILE_TABLE } = fileModel;

export const findFileByClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const files = await service.find(Number(id));
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P02-02-03-05",
        entity: FILE_TABLE,
        entityId: Number(id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(files);
  } catch (error) {
    next(error);
  }
};

export const findFileByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, idCustomer, code, chb } = req.params;
    const file = await service.findOne(
      Number(idCustomer),
      Number(chb),
      Number(code),
      Number(id)
    );

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-03-01",
      entity: FILE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(file);
  } catch (error) {
    next(error);
  }
};

export const createFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.clientId = Number(req.params.id);
    req.body.idCustomer = Number(req.params.idCustomer);
    req.body.code = Number(req.params.code);
    req.body.chb = Number(req.params.chb);
    req.body.tagId = Number(req.params.tagId);
    req.body.files = req.files;
    const { body } = req;
    const newFile = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-03-02",
      entity: FILE_TABLE,
      entityId: 0,
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newFile);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const file = await service.updateFile(id, body.originalName, body.tagId);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-03-04",
      entity: FILE_TABLE,
      entityId: Number(file.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(file);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, code, idCustomer, chb } = req.params;
    await service.delete(
      Number(idCustomer),
      Number(chb),
      Number(code),
      Number(id)
    );

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-03-03",
      entity: FILE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
