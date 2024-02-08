import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import extTagSchema from "../../app/extrajudicial/schemas/ext-tag.schema";
import {
  createExtTagController,
  updateExtTagController,
  updateExtTagActionController,
  deleteExtTagController,
  getExtTagByIdController,
  getExtTagsByCHBController,
  getExtTagsByCHBAndTagGroupIdController,
  getExtTagsController,
} from "../../controllers/extrajudicial/ext-tag.controller";

const {
  getExtTagByCHBSchema,
  getExtTagByCHBAndTagGroupIdSchema,
  getExtTagByIDSchema,
  createExtTagSchema,
  updateExtTagSchema,
  updateExtTagActionSchema,
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
  "/all-data-by-chb-and-tag-group-id/:chb/:tagGroupId",
  JWTAuth,
  validatorHandler(getExtTagByCHBAndTagGroupIdSchema, "params"),
  getExtTagsByCHBAndTagGroupIdController
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
  checkPermissions("P14-01"),
  validatorHandler(createExtTagSchema, "body"),
  createExtTagController
);

router.patch(
  "/action/:id",
  JWTAuth,
  checkPermissions("P14-02"),
  validatorHandler(getExtTagByIDSchema, "params"),
  validatorHandler(updateExtTagActionSchema, "body"),
  updateExtTagActionController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P14-02"),
  validatorHandler(getExtTagByIDSchema, "params"),
  validatorHandler(updateExtTagSchema, "body"),
  updateExtTagController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P14-03"),
  validatorHandler(getExtTagByIDSchema, "params"),
  deleteExtTagController
);

export default router;
