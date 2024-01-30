import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import extTagSchema from "../../app/extrajudicial/schemas/ext-tag.schema";
import {
  createExtTagController,
  updateExtTagController,
  deleteExtTagController,
  getExtTagByIdController,
  getExtTagsByCHBController,
  getExtTagsController,
} from "../../controllers/extrajudicial/ext-tag.controller";

const {
  getExtTagByCHBSchema,
  getExtTagByIDSchema,
  createExtTagSchema,
  updateExtTagSchema,
} = extTagSchema;

const router = express.Router();

router.get("/", JWTAuth, getExtTagsController);

router.get(
  "/all-data-by-chb/:chb",
  JWTAuth,
  validatorHandler(getExtTagByCHBSchema, "params"),
  getExtTagsByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getExtTagByIDSchema, "params"),
  getExtTagByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P02-02-07-01"), // TODO: Changing permission code
  validatorHandler(createExtTagSchema, "body"),
  createExtTagController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-07-02"), // TODO: Changing permission code
  validatorHandler(getExtTagByIDSchema, "params"),
  validatorHandler(updateExtTagSchema, "body"),
  updateExtTagController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-07-03"), // TODO: Changing permission code
  validatorHandler(getExtTagByIDSchema, "params"),
  deleteExtTagController
);

export default router;
