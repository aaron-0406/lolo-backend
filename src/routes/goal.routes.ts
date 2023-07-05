import { Router } from "express";

import goalSchema from "../app/extrajudicial/schemas/goal.schema";
import validatorHandler from "../middlewares/validator.handler";
import {
  createGoalController,
  deleteGoalController,
  getGoalByIdController,
  getGoalController,
  updateGoalController,
} from "../controllers/goal.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const router = Router();
const { getGoalByIdSchema, createGoalSchema, updateGoalSchema } = goalSchema;

router.get("/", JWTAuth, getGoalController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getGoalByIdSchema, "params"),
  getGoalByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createGoalSchema, "body"),
  createGoalController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getGoalByIdSchema, "params"),
  validatorHandler(updateGoalSchema, "body"),
  updateGoalController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getGoalByIdSchema, "params"),
  deleteGoalController
);

export default router;
