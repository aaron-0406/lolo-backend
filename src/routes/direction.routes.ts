import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import directionSchema from "../app/extrajudicial/schemas/direction.schema";
import DirectionService from "../app/extrajudicial/services/direction.service";
import {
  getDirectionByClientIdController,
  getAllDirectionsController,
  getDirectionByIdController,
  createDirectionController,
  updateDirectionController,
  deleteDirectionController,
} from "../controllers/direction.controller";

const {
  createDirectionSchema,
  updateDirectionSchema,
  getDirectionByClientIDSchema,
  getDirectionByIDSchema,
} = directionSchema;

const router = express.Router();
const service = new DirectionService();

router.get("/", getAllDirectionsController);

router.get(
  "/all-client/:clientId",
  validatorHandler(getDirectionByClientIDSchema, "params"),
  getDirectionByClientIdController
);

router.get(
  "/:id",
  validatorHandler(getDirectionByIDSchema, "params"),
  getDirectionByIdController
);

router.post(
  "/",
  validatorHandler(createDirectionSchema, "body"),
  createDirectionController
);

router.patch(
  "/:id",
  validatorHandler(getDirectionByIDSchema, "params"),
  validatorHandler(updateDirectionSchema, "body"),
  updateDirectionController
);

router.delete(
  "/:id",
  validatorHandler(getDirectionByIDSchema, "params"),
  deleteDirectionController
);

export default router;
