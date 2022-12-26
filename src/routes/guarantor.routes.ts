import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import guarantorSchema from "../app/extrajudicial/schemas/guarantor.schema";
import GuarantorService from "../app/extrajudicial/services/guarantor.service";

const {
  getGuarantorByClientIDSchema,
  getGuarantorByIDSchema,
  createGuarantorSchema,
  updateGuarantorSchema,
} = guarantorSchema;

const router = express.Router();
const service = new GuarantorService();

router.get("/", async (req, res, next) => {
  try {
    const guarantors = await service.findAll();
    res.json(guarantors);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:clientID",
  validatorHandler(getGuarantorByClientIDSchema, "params"),
  async (req, res, next) => {
    try {
      const { clientID } = req.params;
      const guarantors = await service.findAllByClient(clientID);
      res.json(guarantors);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getGuarantorByIDSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const guarantor = await service.findByID(id);
      res.json(guarantor);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createGuarantorSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGuarantor = await service.create(body);
      res.status(201).json(newGuarantor);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getGuarantorByIDSchema, "params"),
  validatorHandler(updateGuarantorSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const client = await service.update(id, body);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getGuarantorByIDSchema, "params"),
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
