import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import UserAppSchema from "../../app/boss/schemas/user-app.schema";
import {
  createUserAppController,
  getAllUserAppController,
  getUserAppByIdController,
  updateUserAppController,
} from "../../controllers/dash/user-app.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { createUserSchema, updateUserSchema, getUserSchema } = UserAppSchema;
const router = express.Router();

router.get("/", JWTAuth, getAllUserAppController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getUserSchema, "params"),
  getUserAppByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createUserSchema, "body"),
  createUserAppController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  updateUserAppController
);

export default router;
