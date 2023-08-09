import { Router } from "express";
import validatorHandler from "../../middlewares/validator.handler";
import authSchema from "../../app/boss/schemas/auth.schema";
import { loginDashController } from "../../controllers/dash/auth.controller";

const { loginSchema } = authSchema;
const router = Router();

router.post(
  "/signin",
  validatorHandler(loginSchema, "body"),
  loginDashController
);

export default router;
