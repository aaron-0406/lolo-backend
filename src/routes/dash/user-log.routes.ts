import express from "express";
import { JWTAuth } from "../../middlewares/auth.handler";
import {
  getAllUserLogsController,
  getAllUserLogsByCustomerIdController,
  getUserLogsFilterByCustomerIdController,
} from "../../controllers/dash/user-log.controller";
import validatorHandler from "../../middlewares/validator.handler";
import userLogSchema from "../../app/dash/schemas/user-log.schema";

const router = express.Router();

const {
  getUserLogsByCustomerIdchema,
  getUserLogsFilterByCustomerIdSchema,
  getUserLogsFilterByCustomerIdQuery,
} = userLogSchema;

router.get("/", JWTAuth, getAllUserLogsController);

router.get(
  "/all/:customerId",
  JWTAuth,
  validatorHandler(getUserLogsByCustomerIdchema, "params"),
  getAllUserLogsByCustomerIdController
);

router.get(
  "/filter/:customerId",
  JWTAuth,
  validatorHandler(getUserLogsFilterByCustomerIdSchema, "params"),
  validatorHandler(getUserLogsFilterByCustomerIdQuery, "query"),
  getUserLogsFilterByCustomerIdController
);

export default router;
