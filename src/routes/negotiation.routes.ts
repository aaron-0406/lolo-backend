import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import negotiationSchema from "../app/boss/schemas/negotiation.schema";
import NegotiationService from "../app/boss/services/negotiation.service";

const { getNegotiationSchema, createNegotiationSchema, updateNegotiationSchema } = negotiationSchema;
const router = express.Router();
const service = new NegotiationService();

router.get("/", async (req, res, next) => {
  try {
    const negotiations = await service.findAll();
    res.json(negotiations);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getNegotiationSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const negotiation = await service.findOne(id);
      res.json(negotiation);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createNegotiationSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newNegotiation = await service.create(body);
      res.status(201).json(newNegotiation);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getNegotiationSchema, "params"),
  validatorHandler(updateNegotiationSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const negotiation = await service.update(id, body);
      res.json(negotiation);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getNegotiationSchema, "params"),
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
