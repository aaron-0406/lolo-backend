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
import { JWTAuth } from "../middlewares/auth.handler";

const {
  getNegotiationSchema,
  getNegotiationSchemaQuery,
  getNegotiationByCHBSchema,
  createNegotiationSchema,
  updateNegotiationSchema,
} = negotiationSchema;
const router = express.Router();

router.get("/", JWTAuth, getNegotiationsController);

router.get(
  "/opts",
  validatorHandler(getNegotiationSchemaQuery, "query"),
  async (req, res, next) => {
    try {
      const {rta, quantity} = await service.findAllOpts(req.query);
      res.json({rta, quantity});
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/all/:chb",
  JWTAuth,
  validatorHandler(getNegotiationByCHBSchema, "params"),
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
  validatorHandler(createNegotiationSchema, "body"),
  createNegotiationController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getNegotiationSchema, "params"),
  validatorHandler(updateNegotiationSchema, "body"),
  updateNegotiationController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getNegotiationSchema, "params"),
  deleteNegotiationController
);

export default router;
