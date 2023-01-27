import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import TemplateSchema from "../app/customers/schemas/template.schema";
import TemplateService from "../app/customers/services/template.service";

const { getTemplateByCustomerIdSchema } = TemplateSchema;
const router = express.Router();
const service = new TemplateService();

router.get(
  "/customer/:id",
  validatorHandler(getTemplateByCustomerIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const template = await service.findAllByCustomerId(id);
      res.json(template);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getTemplateByCustomerIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const template = await service.findOne(id);
      
      res.json(template);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
