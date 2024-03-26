import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import negotiationSchema from "../../app/dash/schemas/negotiation.schema";
import {
  createNegotiationController,
  deleteNegotiationController,
  getNegotiationsByCHBController,
  getNegotiationsByIdController,
  getNegotiationsController,
  updateNegotiationController,
} from "../../controllers/dash/negotiation.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getNegotiationSchema,
  getNegotiationByCHBSchema,
  getNegotiationByCHBSchemaQuery,
  createNegotiationSchema,
  updateNegotiationSchema,
} = negotiationSchema;
const router = express.Router();

router.get("/", JWTAuth, getNegotiationsController);

router.get(
  "/all/:chb",
  JWTAuth,
  checkPermissions("P09-04"),
  validatorHandler(getNegotiationByCHBSchema, "params"),
  validatorHandler(getNegotiationByCHBSchemaQuery, "query"),
  getNegotiationsByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getNegotiationSchema, "params"),
  getNegotiationsByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P09-01"),
  validatorHandler(createNegotiationSchema, "body"),
  createNegotiationController
);

router.put(
  "/:id",
  JWTAuth,
  checkPermissions("P09-02"),
  validatorHandler(getNegotiationSchema, "params"),
  validatorHandler(updateNegotiationSchema, "body"),
  updateNegotiationController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P09-03"),
  validatorHandler(getNegotiationSchema, "params"),
  deleteNegotiationController
);

export default router;
