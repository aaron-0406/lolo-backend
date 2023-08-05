import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import negotiationSchema from "../app/boss/schemas/negotiation.schema";
import {
  createNegotiationController,
  deleteNegotiationController,
  getNegotiationsByCHBController,
  getNegotiationsByIdController,
  getNegotiationsController,
  updateNegotiationController,
} from "../controllers/negotiation.controller";

const {
  getNegotiationSchema,
  getNegotiationByCHBSchema,
  createNegotiationSchema,
  updateNegotiationSchema,
} = negotiationSchema;
const router = express.Router();

router.get("/", getNegotiationsController);

router.get(
  "/all/:chb",
  validatorHandler(getNegotiationByCHBSchema, "params"),
  getNegotiationsByCHBController
);

router.get(
  "/:id",
  validatorHandler(getNegotiationSchema, "params"),
  getNegotiationsByIdController
);

router.post(
  "/",
  validatorHandler(createNegotiationSchema, "body"),
  createNegotiationController
);

router.put(
  "/:id",
  validatorHandler(getNegotiationSchema, "params"),
  validatorHandler(updateNegotiationSchema, "body"),
  updateNegotiationController
);

router.delete(
  "/:id",
  validatorHandler(getNegotiationSchema, "params"),
  deleteNegotiationController
);

export default router;
