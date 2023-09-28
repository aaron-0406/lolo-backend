import express from "express";
import { JWTAuth } from "../../middlewares/auth.handler";
import {
  getAllUserLogsController,
  getAllUserLogsByCustomerIdController,
} from "../../controllers/dash/user-log.controller";
import validatorHandler from "../../middlewares/validator.handler";
import userLogSchema from "../../app/dash/schemas/user-log.schema";

const router = express.Router();

const { getUserLogsByCustomerIdchema } = userLogSchema;

router.get("/", JWTAuth, getAllUserLogsController);

router.get(
  "/all/:customerId",
  JWTAuth,
  validatorHandler(getUserLogsByCustomerIdchema, "params"),
  getAllUserLogsByCustomerIdController
);

export default router;
