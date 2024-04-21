import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import extTagGroupSchema from "../../app/extrajudicial/schemas/ext-contact-type.schema";
import {
  getExtContactTypeController,
  getExtContactTypeByCHBController,
  getExtContactTypeByIdController,
  createExtContactTypeController,
  updateExtContactTypeController,
  deleteExtContactTypeController,
} from "../../controllers/extrajudicial/ext-contact-type.controller";

const {
  createExtContactTypeSchema,
  updateExtContactTypeSchema,
  getExtContactTypeByCHBSchema,
  getExtContactTypeByIDSchema,
  getContactTypeByCHBSchemaQuery,
} = extTagGroupSchema;

const router = express.Router();

router.get("/", JWTAuth, getExtContactTypeController);

router.get(
  "/all-data-by-chb/:chb",
  JWTAuth,
  checkPermissions("P18-04"),
  validatorHandler(getExtContactTypeByCHBSchema, "params"),
  validatorHandler(getContactTypeByCHBSchemaQuery, "query"),
  getExtContactTypeByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getExtContactTypeByIDSchema, "params"),
  getExtContactTypeByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P18-01"),
  validatorHandler(createExtContactTypeSchema, "body"),
  createExtContactTypeController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P18-02"),
  validatorHandler(getExtContactTypeByIDSchema, "params"),
  validatorHandler(updateExtContactTypeSchema, "body"),
  updateExtContactTypeController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P18-03"),
  validatorHandler(getExtContactTypeByIDSchema, "params"),
  deleteExtContactTypeController
);

export default router;
