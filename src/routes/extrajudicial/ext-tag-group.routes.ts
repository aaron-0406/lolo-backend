import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import extTagGroupSchema from "../../app/extrajudicial/schemas/ext-tag-group.schema";
import {
  createExtTagGroupController,
  updateExtTagGroupController,
  deleteExtTagGroupController,
  getExtTagGroupByIdController,
  getExtTagGroupByCHBController,
  getExtTagGroupController,
} from "../../controllers/extrajudicial/ext-tag-group.controller";

const {
  getExtTagGroupByIDSchema,
  createExtTagGroupSchema,
  updateExtTagGroupSchema,
} = extTagGroupSchema;

const router = express.Router();

router.get("/", JWTAuth, getExtTagGroupController);

router.get("/all-data-with-order", JWTAuth, getExtTagGroupByCHBController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getExtTagGroupByIDSchema, "params"),
  getExtTagGroupByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P02-02-07-01"), // TODO: Changing permission code
  validatorHandler(createExtTagGroupSchema, "body"),
  createExtTagGroupController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-07-02"), // TODO: Changing permission code
  validatorHandler(getExtTagGroupByIDSchema, "params"),
  validatorHandler(updateExtTagGroupSchema, "body"),
  updateExtTagGroupController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-07-03"), // TODO: Changing permission code
  validatorHandler(getExtTagGroupByIDSchema, "params"),
  deleteExtTagGroupController
);

export default router;
