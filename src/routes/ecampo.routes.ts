import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import ECampoSchema from "../app/customers/schemas/ecampo.schema";
import { findECampoByTemplateIdController } from "../controllers/ecampo.controllr";

const { getECampoByIdSchema } = ECampoSchema;
const router = express.Router();
import { JWTAuth } from "../middlewares/auth.handler";

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getECampoByIdSchema, "params"),
  findECampoByTemplateIdController
);

export default router;
