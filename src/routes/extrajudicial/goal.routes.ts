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
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const router = Router();
const {
  getGoalByIdSchema,
  createGoalSchema,
  updateGoalSchema,
  getGoalQuerySchema,
  getCustomerUsersGoalsQuery,
} = goalSchema;

router.get(
  "/",
  JWTAuth,
  checkPermissions("P04-05"),
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

router.get(
  "/:goalId/customer-user",
  JWTAuth,
  checkPermissions("P04-06"),
  validatorHandler(getCustomerUsersGoalsQuery, "query"),
  getCustomerUsersGoals
);

router.put(
  "/:goalId/customer-user",
  JWTAuth,
  checkPermissions("P04-04"),
  updateCustomerUserGoals
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P04-01"),
  validatorHandler(createGoalSchema, "body"),
  createGoalController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P04-02"),
  validatorHandler(getGoalByIdSchema, "params"),
  validatorHandler(updateGoalSchema, "body"),
  updateGoalController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P04-03"),
  validatorHandler(getGoalByIdSchema, "params"),
  deleteGoalController
);

export default router;
