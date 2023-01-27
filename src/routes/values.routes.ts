import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import ValuesSchema from "../app/customers/schemas/values.schema";
import ValuesService from "../app/customers/services/values.service";

const { getValuesByTemplateHasValuesIdSchema } = ValuesSchema;
const router = express.Router();
const service = new ValuesService();

router.get(
  "/:id",
  validatorHandler(getValuesByTemplateHasValuesIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const values = await service.findAllByTemplateHasValuesId(id);
      res.json(values);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
