import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import TemplateSchema from "../app/extrajudicial/schemas/template.schema";
import {
  getTemplateByCustomerIdController,
  getTemplateByIdController,
} from "../controllers/template.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const { getTemplateByCustomerIdSchema } = TemplateSchema;
const router = express.Router();

router.get(
  "/customer/:id",
  JWTAuth,
  validatorHandler(getTemplateByCustomerIdSchema, "params"),
  getTemplateByCustomerIdController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getTemplateByCustomerIdSchema, "params"),
  getTemplateByIdController
);

export default router;
