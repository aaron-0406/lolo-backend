import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import ValuesSchema from "../app/customers/schemas/values.schema";
import { getValuesByTemplateHasValuesIdController } from "../controllers/values.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const { getValuesByTemplateHasValuesIdSchema } = ValuesSchema;
const router = express.Router();

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getValuesByTemplateHasValuesIdSchema, "params"),
  getValuesByTemplateHasValuesIdController
);

export default router;
