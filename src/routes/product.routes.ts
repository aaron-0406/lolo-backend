import { Router, Request, Response, NextFunction } from "express";
import {
  changeProductSchema,
  createProductSchema,
  getProductByCodeSchema,
  getProductByIdSchema,
  getProductsByClientCodeSchema,
  getProductsByCustomerIdSchema,
  updateProductSchema,
} from "../app/customers/schemas/product.schema";
import validatorHandler from "../middlewares/validator.handler";
import boom from "@hapi/boom";
import ProductService from "../app/customers/services/product.service";

const router = Router();

const service = new ProductService();

router.get(
  "/client/:code",
  validatorHandler(getProductsByClientCodeSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;
      const products = await service.getByClientCode(code);
      res.json(products);
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.get(
  "/single/:code",
  validatorHandler(getProductByCodeSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;
      const product = await service.getByProductCode(code);
      res.json(product);
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.get(
  "/:customerId",
  validatorHandler(getProductsByCustomerIdSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { customerId } = req.params;
      const products = await service.getAllByCustomerId(Number(customerId));
      res.json(products);
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await service.create(req.body);
      res.json(product);
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getProductByIdSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await service.update(req.body, Number(id));
      res.json(product);
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getProductByIdSchema, "params"),
  validatorHandler(changeProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await service.change(req.body, Number(id));
      res.json(product);
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getProductByIdSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await service.delete(Number(id));
      res.json(Number(id));
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

export default router;
