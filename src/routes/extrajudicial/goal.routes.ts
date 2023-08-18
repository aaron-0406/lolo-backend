import { Router } from "express";

import goalSchema from "../../app/extrajudicial/schemas/goal.schema";
import validatorHandler from "../../middlewares/validator.handler";
import {
  createGoalController,
  deleteGoalController,
  getGoalByIdController,
  getGoalController,
  updateGoalController,
  getCustomerUsersGoals,
  updateCustomerUserGoals,
  getCustomerUserGoal as getPersonalGoal,
  getGoalGlobalController,
} from "../../controllers/extrajudicial/goal.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const router = Router();
const {
  getGoalByIdSchema,
  createGoalSchema,
  updateGoalSchema,
  getGoalQuerySchema,
} = goalSchema;

router.get(
  "/",
  JWTAuth,
  validatorHandler(getGoalQuerySchema, "query"),
  getGoalController
);

router.get("/personal-goal", JWTAuth, getPersonalGoal);
router.get("/global-goal", JWTAuth, getGoalGlobalController);
router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getGoalByIdSchema, "params"),
  getGoalByIdController
);

router.get("/:goalId/customer-user", JWTAuth, getCustomerUsersGoals);
router.put("/:goalId/customer-user", JWTAuth, updateCustomerUserGoals);

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
