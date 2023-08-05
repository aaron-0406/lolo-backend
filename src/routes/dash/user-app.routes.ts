import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import UserAppSchema from "../../app/boss/schemas/user-app.schema";
import {
  createUserAppController,
  getAllUserAppController,
  getUserAppByIdController,
  updateUserAppController,
} from "../../controllers/dash/user-app.controller";

const { createUserSchema, updateUserSchema, getUserSchema } = UserAppSchema;
const router = express.Router();

router.get("/", getAllUserAppController);

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  getUserAppByIdController
);

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  createUserAppController
);

router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  updateUserAppController
);

export default router;
