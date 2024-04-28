import { Request, Response, NextFunction } from "express";
import ExtProductNameService from "../../app/extrajudicial/services/ext-product-name.service";
import UserLogService from "../../app/dash/services/user-log.service";
import extProductNameModel from "../../db/models/ext-product-name.model";

const service = new ExtProductNameService();
const serviceUserLog = new UserLogService();

const { EXT_PRODUCT_NAME_TABLE } = extProductNameModel;

export const getExtProductNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const extProductsName = await service.findAll();
    res.json(extProductsName);
  } catch (error) {
    next(error);
  }
};

export const getExtProductNameByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const extProductsName = await service.findAllByCHB(chb);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P19-04",
        entity: EXT_PRODUCT_NAME_TABLE,
        entityId: Number(chb),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(extProductsName);
  } catch (error) {
    next(error);
  }
};

export const getExtProductNameByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const extProductName = await service.findByID(id);
    res.json(extProductName);
  } catch (error) {
    next(error);
  }
};

export const createExtProductNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newExtProductName = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P19-01",
      entity: EXT_PRODUCT_NAME_TABLE,
      entityId: Number(newExtProductName.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newExtProductName);
  } catch (error) {
    next(error);
  }
};

export const updateExtProductNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const extProductName = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P19-02",
      entity: EXT_PRODUCT_NAME_TABLE,
      entityId: Number(extProductName.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(extProductName);
  } catch (error) {
    next(error);
  }
};

export const deleteExtProductNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P19-03",
      entity: EXT_PRODUCT_NAME_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
