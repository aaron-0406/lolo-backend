import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import CustomersService from "../services/customer.service";
import customerSchemas from "../schemas/customer.schema";

const { getCustomerSchema, createCustomerSchema } = customerSchemas;
const router = express.Router();
const service = new CustomersService();

router.get("/", async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
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
