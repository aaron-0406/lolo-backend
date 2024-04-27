import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import ProductService from "../../app/extrajudicial/services/product.service";
import UserLogService from "../../app/dash/services/user-log.service";
import productModel from "../../db/models/product.model";

const service = new ProductService();
const serviceUserLog = new UserLogService();

const { PRODUCT_TABLE } = productModel;

//INFO: CLIENTS SECTION
export const getProductsByClientCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const products = await service.getByClientId(Number(clientId));
    res.json(products);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await service.getByProductId(parseInt(id));
    res.json(product);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

//INFO: JUDICIAL - CASE FILE SECTION
export const getProductsByJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { judicialCaseFileId } = req.params;
    const products = await service.getByJudicialCaseFileId(
      Number(judicialCaseFileId)
    );
    res.json(products);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const assignJudicialCaseFileToProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productIds, judicialCaseFileId } = req.body;
    const products = await service.assignJudicialCaseFileToProducts(
      productIds,
      Number(judicialCaseFileId)
    );

    const userId = Number(req.user?.id);
    const customerId = Number(req.user?.customerId);

    for (const product of products) {
      const productId = Number(product.id);

      await serviceUserLog.create({
        customerUserId: Number(userId),
        codeAction: "P02-02-06-01", //TODO: CHANGE THIS PERMISSION
        entity: PRODUCT_TABLE,
        entityId: Number(productId),
        ip: req.clientIp ?? "",
        customerId: Number(customerId),
      });
    }

    res.json(products);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const removeJudicialCaseFileFromProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productRemovedId, judicialCaseFileId } = req.body;
    const { id } = await service.removeJudicialCaseFileFromProduct(
      productRemovedId,
      judicialCaseFileId
    );

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-06-01", //TODO: CHANGE THIS PERMISSION
      entity: PRODUCT_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json({ id });
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

//INFO: DASHBOARD SECTION
export const getProductByCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    const product = await service.getByProductCode(code);
    res.json(product);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const getProductsByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const products = await service.getAllByCustomerId(Number(customerId));
    res.json(products);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await service.create(req.body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-06-01",
      entity: PRODUCT_TABLE,
      entityId: Number(product.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(product);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await service.update(req.body, Number(id));

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-06-02",
      entity: PRODUCT_TABLE,
      entityId: Number(product.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(product);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(Number(id));

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-06-03",
      entity: PRODUCT_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(Number(id));
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};
