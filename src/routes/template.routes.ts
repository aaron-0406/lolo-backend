import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import TemplateSchema from "../app/customers/schemas/template.schema";
import {
  getTemplateByCustomerIdController,
  getTemplateByIdController,
} from "../controllers/template.controller";

const { getTemplateByCustomerIdSchema } = TemplateSchema;
const router = express.Router();

router.get(
  "/customer/:id",
  validatorHandler(getTemplateByCustomerIdSchema, "params"),
  getTemplateByCustomerIdController
);

router.get(
  "/:id",
  validatorHandler(getTemplateByCustomerIdSchema, "params"),
  getTemplateByIdController
);

export default router;
