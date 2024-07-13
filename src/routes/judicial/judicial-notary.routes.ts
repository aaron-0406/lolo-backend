import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialNotarySchema from "../../app/judicial/schemas/judicial-notary.schema";
import {
  findNotaryByIdController,
  findAllNotariesByCHBController,
  createNotaryController,
  deletedNotaryController,
  updateNotaryController,
} from "../../controllers/judicial/judicial-notary.controller";

const {
  createJudicialNotarySchema,
  getJudicialNotaryByCHBSchema,
  getJudicialNotaryByIDSchema,
  updateJudicialNotarySchema,
} = judicialNotarySchema;

const router = express.Router();

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialNotaryByIDSchema, "params"),
  findNotaryByIdController
);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialNotaryByCHBSchema, "params"),
  findAllNotariesByCHBController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P41-01"),
  validatorHandler(createJudicialNotarySchema, "body"),
  createNotaryController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P41-02"),
  validatorHandler(updateJudicialNotarySchema, "body"),
  updateNotaryController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P41-03"),
  validatorHandler(getJudicialNotaryByIDSchema, "params"),
  deletedNotaryController
);

export default router;
