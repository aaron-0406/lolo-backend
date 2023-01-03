import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import customerHasBankSchema from "../app/customers/schemas/customer-has-bank.schema";
import CustomerHasBankService from "../app/customers/services/customer-has-bank.service";

const {
  getCustomerSchema,
  getCustomerHasBankSchema,
  createCustomerHasBankSchema,
} = customerHasBankSchema;

const router = express.Router();
const service = new CustomerHasBankService();

router.get("/", async (req, res, next) => {
  try {
    const customersBanks = await service.findAll();
    res.json(customersBanks);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:idCustomer/:idBank",
  validatorHandler(getCustomerHasBankSchema, "params"),
  async (req, res, next) => {
    try {
      const { idCustomer, idBank } = req.params;
      const customerBank = await service.findOne(idCustomer, idBank);
      res.json(customerBank);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createCustomerHasBankSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomerBank = await service.assign(body);
      res.status(201).json(newCustomerBank);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:idCustomer/:idBank",
  validatorHandler(getCustomerHasBankSchema, "params"),
  async (req, res, next) => {
    try {
      const { idCustomer, idBank } = req.params;
      await service.delete(idCustomer, idBank);
      res.status(201).json({ idCustomer, idBank });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
