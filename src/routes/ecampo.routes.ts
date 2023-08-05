import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import ECampoSchema from "../app/customers/schemas/ecampo.schema";
import ECampoService from "../app/customers/services/ecampo.service";
import { findECampoByTemplateIdController } from "../controllers/ecampo.controllr";

const { getECampoByIdSchema } = ECampoSchema;
const router = express.Router();
const service = new ECampoService();

router.get(
  "/:id",
  validatorHandler(getECampoByIdSchema, "params"),
  findECampoByTemplateIdController
);

export default router;
