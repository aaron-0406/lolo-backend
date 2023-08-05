import { Router } from "express";
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
import {
  changeProductController,
  createProductController,
  deleteProductController,
  getProductByCodeController,
  getProductsByClientCodeController,
  getProductsByCustomerIdController,
  updateProductController,
} from "../controllers/product.controller";

const router = Router();

router.get(
  "/client/:code",
  validatorHandler(getProductsByClientCodeSchema, "params"),
  getProductsByClientCodeController
);

router.get(
  "/single/:code",
  validatorHandler(getProductByCodeSchema, "params"),
  getProductByCodeController
);

router.get(
  "/:customerId",
  validatorHandler(getProductsByCustomerIdSchema, "params"),
  getProductsByCustomerIdController
);

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  createProductController
);

router.put(
  "/:id",
  validatorHandler(getProductByIdSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  updateProductController
);

router.patch(
  "/:id",
  validatorHandler(getProductByIdSchema, "params"),
  validatorHandler(changeProductSchema, "body"),
  changeProductController
);

router.delete(
  "/:id",
  validatorHandler(getProductByIdSchema, "params"),
  deleteProductController
);

export default router;
