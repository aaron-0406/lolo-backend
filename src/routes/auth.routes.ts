import { Router } from "express";
import validatorHandler from "../middlewares/validator.handler";
import authSchema from "../app/customers/schemas/auth.schema";
import { loginController } from "../controllers/auth.controller";

const { loginSchema } = authSchema;

const router = Router();

router.post("/signin", validatorHandler(loginSchema, "body"), loginController);

export default router;
