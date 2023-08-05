import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import templateHasValuesSchema from "../app/customers/schemas/template-has-values.schema";
import {
  createTemplateHasValuesController,
  deleteTemplateHasValues,
  getTemplateHasValuesByCustomerIdController,
  getTemplateHasValuesByTemplateIdController,
  updateTemplateHasValues,
} from "../controllers/template-has-values.controller";

const {
  createTemplateHasValuesSchema,
  updateTemplateHasValuesSchema,
  getTemplateHasValuesByIdSchema,
} = templateHasValuesSchema;
const router = express.Router();

router.get(
  "/:id",
  validatorHandler(getTemplateHasValuesByIdSchema, "params"),
  getTemplateHasValuesByTemplateIdController
);

router.get(
  "/customer/:id",
  validatorHandler(getTemplateHasValuesByIdSchema, "params"),
  getTemplateHasValuesByCustomerIdController
);

router.post(
  "/",
  validatorHandler(createTemplateHasValuesSchema, "body"),
  createTemplateHasValuesController
);

router.put(
  "/:id",
  validatorHandler(getTemplateHasValuesByIdSchema, "params"),
  validatorHandler(updateTemplateHasValuesSchema, "body"),
  updateTemplateHasValues
);

router.delete(
  "/:id",
  validatorHandler(getTemplateHasValuesByIdSchema, "params"),
  deleteTemplateHasValues
);

export default router;
