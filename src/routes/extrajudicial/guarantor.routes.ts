import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import guarantorSchema from "../../app/extrajudicial/schemas/guarantor.schema";
import {
  createGuarantorController,
  deleteGuarantorController,
  getGuarantorByClientIdController,
  getGuarantorByIdController,
  getGuarantorController,
  updateGuarantorController,
} from "../../controllers/extrajudicial/guarantor.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

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
  checkPermissions("P03-07-01"),
  validatorHandler(createGuarantorSchema, "body"),
  createGuarantorController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P03-07-02"),
  validatorHandler(getGuarantorByIDSchema, "params"),
  validatorHandler(updateGuarantorSchema, "body"),
  updateGuarantorController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P03-07-03"),
  validatorHandler(getGuarantorByIDSchema, "params"),
  deleteGuarantorController
);

export default router;
