import { Router } from "express";
import validatorHandler from "../../middlewares/validator.handler";
import authSchema from "../../app/extrajudicial/schemas/auth.schema";
import {
  loginController,
  changePasswordController,
  changeCredentialsController,
} from "../../controllers/extrajudicial/auth.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { loginSchema, changePasswordSchema, changeCredentialsSchema } =
  authSchema;

const router = Router();

router.post("/signin", validatorHandler(loginSchema, "body"), loginController);

router.post(
  "/change-password",
  JWTAuth,
  validatorHandler(changePasswordSchema, "body"),
  changePasswordController
);

router.post(
  "/change-credentials",
  JWTAuth,
  validatorHandler(changeCredentialsSchema, "body"),
  changeCredentialsController
);

export default router;
