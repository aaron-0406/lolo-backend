import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import templateHasValuesSchema from "../app/extrajudicial/schemas/template-has-values.schema";
import {
  createTemplateHasValuesController,
  deleteTemplateHasValues,
  getTemplateHasValuesByCustomerIdController,
  getTemplateHasValuesByTemplateIdController,
  updateTemplateHasValues,
} from "../controllers/extrajudicial/template-has-values.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const {
  createTemplateHasValuesSchema,
  updateTemplateHasValuesSchema,
  getTemplateHasValuesByIdSchema,
} = templateHasValuesSchema;
const router = express.Router();

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getTemplateHasValuesByIdSchema, "params"),
  getTemplateHasValuesByTemplateIdController
);

router.get(
  "/customer/:id",
  JWTAuth,
  validatorHandler(getTemplateHasValuesByIdSchema, "params"),
  getTemplateHasValuesByCustomerIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createTemplateHasValuesSchema, "body"),
  createTemplateHasValuesController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getTemplateHasValuesByIdSchema, "params"),
  validatorHandler(updateTemplateHasValuesSchema, "body"),
  updateTemplateHasValues
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getTemplateHasValuesByIdSchema, "params"),
  deleteTemplateHasValues
);

export default router;
