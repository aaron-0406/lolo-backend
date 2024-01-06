import { Router } from "express";
import {
  changeProductSchema,
  createProductSchema,
  getProductByCodeSchema,
  getProductByIdSchema,
  getProductsByClientCodeSchema,
  getProductsByCustomerIdSchema,
  updateProductSchema,
} from "../../app/extrajudicial/schemas/product.schema";
import validatorHandler from "../../middlewares/validator.handler";
import {
  changeProductController,
  createProductController,
  deleteProductController,
  getProductByCodeController,
  getProductByIdController,
  getProductsByClientCodeController,
  getProductsByCustomerIdController,
  updateProductController,
} from "../../controllers/extrajudicial/product.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const router = Router();

router.get(
  "/client/:code",
  JWTAuth,
  validatorHandler(getProductsByClientCodeSchema, "params"),
  getProductsByClientCodeController
);

router.get(
  "/client-by-id/:id",
  JWTAuth,
  validatorHandler(getProductByIdSchema, "params"),
  getProductByIdController
);

router.get(
  "/single/:code",
  JWTAuth,
  validatorHandler(getProductByCodeSchema, "params"),
  getProductByCodeController
);

router.get(
  "/:customerId",
  JWTAuth,
  validatorHandler(getProductsByCustomerIdSchema, "params"),
  getProductsByCustomerIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P02-02-06-01"),
  validatorHandler(createProductSchema, "body"),
  createProductController
);

router.put(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-06-02"),
  validatorHandler(getProductByIdSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  updateProductController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getProductByIdSchema, "params"),
  validatorHandler(changeProductSchema, "body"),
  changeProductController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-06-03"),
  validatorHandler(getProductByIdSchema, "params"),
  deleteProductController
);

export default router;
