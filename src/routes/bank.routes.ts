import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import bankSchema from "../app/boss/schemas/bank.schema";
import BankService from "../app/boss/services/bank.service";

const { getBankSchema, createBankSchema, updateBankSchema } = bankSchema;
const router = express.Router();
const service = new BankService();

router.get("/", async (req, res, next) => {
  try {
    const banks = await service.findAll();
    res.json(banks);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getBankSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const bank = await service.findOne(id);
      res.json(bank);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createBankSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBank = await service.create(body);
      res.status(201).json(newBank);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getBankSchema, "params"),
  validatorHandler(updateBankSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const bank = await service.update(id, body);
      res.json(bank);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getBankSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
