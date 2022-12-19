import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import CustomerService from "../app/customers/services/customer.service";
import customerSchemas from "../app/customers/schemas/customer.schema";

const { getCustomerByUrlSchema, createCustomerSchema } = customerSchemas;
const router = express.Router();
const service = new CustomerService();

router.get("/", async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:urlIdentifier",
  validatorHandler(getCustomerByUrlSchema, "params"),
  async (req, res, next) => {
    try {
      const { urlIdentifier } = req.params;
      const customer = await service.findOne(urlIdentifier);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
