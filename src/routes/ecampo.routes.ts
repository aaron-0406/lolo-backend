import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import ECampoSchema from "../app/customers/schemas/ecampo.schema";
import ECampoService from "../app/customers/services/ecampo.service";

const { getECampoByIdSchema } = ECampoSchema;
const router = express.Router();
const service = new ECampoService();

router.get(
  "/:id",
  validatorHandler(getECampoByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ECampo = await service.findAllByTemplateId(id);
      res.json(ECampo);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
