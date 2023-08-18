import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import ProductService from "../../app/extrajudicial/services/product.service";

const service = new ProductService();

export const getProductsByClientCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    const products = await service.getByClientCode(code);
    res.json(products);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

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
    res.json(product);
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const changeProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await service.change(req.body, Number(id));
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
    res.json(Number(id));
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};
