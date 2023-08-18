import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import bankSchema from "../../app/dash/schemas/bank.schema";
import {
  createBankController,
  deleteBankController,
  getBankByIdController,
  getBanksController,
  updateBankController,
} from "../../controllers/dash/bank.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { getBankSchema, createBankSchema, updateBankSchema } = bankSchema;
const router = express.Router();

router.get("/", JWTAuth, getBanksController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getBankSchema, "params"),
  getBankByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createBankSchema, "body"),
  createBankController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getBankSchema, "params"),
  validatorHandler(updateBankSchema, "body"),
  updateBankController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getBankSchema, "params"),
  deleteBankController
);

export default router;
