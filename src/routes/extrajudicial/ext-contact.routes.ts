import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import extContactSchema from "../../app/extrajudicial/schemas/ext-contact.schema";
import {
  createExtContactController,
  updateExtContactController,
  deleteExtContactController,
  getExtContactByIdController,
  getExtContactClientIdController,
  getExtContactController,
} from "../../controllers/extrajudicial/ext-contact.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getExtContactByClientIDSchema,
  getExtContactByIDSchema,
  createExtContactSchema,
  updateExtContactSchema,
} = extContactSchema;

const router = express.Router();

router.get("/", JWTAuth, getExtContactController);

router.get(
  "/all-client/:clientId",
  JWTAuth,
  validatorHandler(getExtContactByClientIDSchema, "params"),
  getExtContactClientIdController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getExtContactByIDSchema, "params"),
  getExtContactByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P02-02-04-01"), //changing
  validatorHandler(createExtContactSchema, "body"),
  createExtContactController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-04-02"), //changing
  validatorHandler(getExtContactByIDSchema, "params"),
  validatorHandler(updateExtContactSchema, "body"),
  updateExtContactController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-04-03"), //changing
  validatorHandler(getExtContactByIDSchema, "params"),
  deleteExtContactController
);

export default router;
