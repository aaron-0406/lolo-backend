import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import guarantorSchema from "../app/extrajudicial/schemas/guarantor.schema";
import GuarantorService from "../app/extrajudicial/services/guarantor.service";
import {
  createGuarantorController,
  deleteGuarantorController,
  getGuarantorByClientIdController,
  getGuarantorByIdController,
  getGuarantorController,
  updateGuarantorController,
} from "../controllers/guarantor.controller";

const {
  getGuarantorByClientIDSchema,
  getGuarantorByIDSchema,
  createGuarantorSchema,
  updateGuarantorSchema,
} = guarantorSchema;

const router = express.Router();
const service = new GuarantorService();

router.get("/", getGuarantorController);

router.get(
  "/all-client/:clientId",
  validatorHandler(getGuarantorByClientIDSchema, "params"),
  getGuarantorByClientIdController
);

router.get(
  "/:id",
  validatorHandler(getGuarantorByIDSchema, "params"),
  getGuarantorByIdController
);

router.post(
  "/",
  validatorHandler(createGuarantorSchema, "body"),
  createGuarantorController
);

router.patch(
  "/:id",
  validatorHandler(getGuarantorByIDSchema, "params"),
  validatorHandler(updateGuarantorSchema, "body"),
  updateGuarantorController
);

router.delete(
  "/:id",
  validatorHandler(getGuarantorByIDSchema, "params"),
  deleteGuarantorController
);

export default router;
