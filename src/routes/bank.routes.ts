import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import bankSchema from "../app/boss/schemas/bank.schema";
import {
  createBankController,
  deleteBankController,
  getBankByIdController,
  getBanksController,
  updateBankController,
} from "../controllers/bank.controller";

const { getBankSchema, createBankSchema, updateBankSchema } = bankSchema;
const router = express.Router();

router.get("/", getBanksController);

router.get(
  "/:id",
  validatorHandler(getBankSchema, "params"),
  getBankByIdController
);

router.post(
  "/",
  validatorHandler(createBankSchema, "body"),
  createBankController
);

router.put(
  "/:id",
  validatorHandler(getBankSchema, "params"),
  validatorHandler(updateBankSchema, "body"),
  updateBankController
);

router.delete(
  "/:id",
  validatorHandler(getBankSchema, "params"),
  deleteBankController
);

export default router;
