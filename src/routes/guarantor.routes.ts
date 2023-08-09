import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import guarantorSchema from "../app/extrajudicial/schemas/guarantor.schema";
import {
  createGuarantorController,
  deleteGuarantorController,
  getGuarantorByClientIdController,
  getGuarantorByIdController,
  getGuarantorController,
  updateGuarantorController,
} from "../controllers/guarantor.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const {
  getGuarantorByClientIDSchema,
  getGuarantorByIDSchema,
  createGuarantorSchema,
  updateGuarantorSchema,
} = guarantorSchema;

const router = express.Router();

router.get("/", JWTAuth, getGuarantorController);

router.get(
  "/all-client/:clientId",
  JWTAuth,
  validatorHandler(getGuarantorByClientIDSchema, "params"),
  getGuarantorByClientIdController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getGuarantorByIDSchema, "params"),
  getGuarantorByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createGuarantorSchema, "body"),
  createGuarantorController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getGuarantorByIDSchema, "params"),
  validatorHandler(updateGuarantorSchema, "body"),
  updateGuarantorController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getGuarantorByIDSchema, "params"),
  deleteGuarantorController
);

export default router;
