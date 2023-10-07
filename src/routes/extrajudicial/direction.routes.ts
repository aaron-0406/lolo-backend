import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import directionSchema from "../../app/extrajudicial/schemas/direction.schema";
import {
  getDirectionByClientIdController,
  getAllDirectionsController,
  getDirectionByIdController,
  createDirectionController,
  updateDirectionController,
  deleteDirectionController,
} from "../../controllers/extrajudicial/direction.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  createDirectionSchema,
  updateDirectionSchema,
  getDirectionByClientIDSchema,
  getDirectionByIDSchema,
} = directionSchema;

const router = express.Router();

router.get("/", JWTAuth, getAllDirectionsController);

router.get(
  "/all-client/:clientId",
  JWTAuth,
  validatorHandler(getDirectionByClientIDSchema, "params"),
  getDirectionByClientIdController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getDirectionByIDSchema, "params"),
  getDirectionByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P03-08-01"),
  validatorHandler(createDirectionSchema, "body"),
  createDirectionController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P03-08-02"),
  validatorHandler(getDirectionByIDSchema, "params"),
  validatorHandler(updateDirectionSchema, "body"),
  updateDirectionController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P03-08-03"),
  validatorHandler(getDirectionByIDSchema, "params"),
  deleteDirectionController
);

export default router;
