import { Router } from "express";
import validatorHandler from "../middlewares/validator.handler";
import authSchema from "../app/extrajudicial/schemas/auth.schema";
import {
  loginController,
  changePasswordController,
} from "../controllers/extrajudicial/auth.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const { loginSchema, changePasswordSchema } = authSchema;

const router = Router();

router.post("/signin", validatorHandler(loginSchema, "body"), loginController);

router.post(
  "/change-password",
  JWTAuth,
  validatorHandler(changePasswordSchema, "body"),
  changePasswordController
);

export default router;
