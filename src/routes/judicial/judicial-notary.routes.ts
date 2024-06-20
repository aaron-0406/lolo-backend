import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth } from "../../middlewares/auth.handler";
import judicialNotarySchema from "../../app/judicial/schemas/judicial-notary.schema";
import {
  createNotaryController,
  deletedNotaryController,
  findAllNotariesByCHBController,
  findAllNotariesController,
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
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialNotaryByCHBSchema, "params"),
  findAllNotariesByCHBController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialNotarySchema, "body"),
  createNotaryController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(updateJudicialNotarySchema, "body"),
  updateNotaryController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialNotaryByIDSchema, "params"),
  deletedNotaryController
);

export default router;
