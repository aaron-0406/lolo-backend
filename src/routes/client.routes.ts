import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import clientSchema from "../app/extrajudicial/schemas/client.schema";
import ClientService from "../app/extrajudicial/services/client.service";

const { getClientByCodeSchema, createClientSchema, updateClientSchema } =
  clientSchema;
const router = express.Router();
const service = new ClientService();

router.get("/", async (req, res, next) => {
  try {
    const clients = await service.findAll();
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:code",
  validatorHandler(getClientByCodeSchema, "params"),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      const client = await service.findCode(code);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createClientSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newClient = await service.create(body);
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:code",
  validatorHandler(getClientByCodeSchema, "params"),
  validatorHandler(updateClientSchema, "body"),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      const body = req.body;
      const client = await service.update(code, body);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:code",
  validatorHandler(getClientByCodeSchema, "params"),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      await service.delete(code);
      res.status(201).json({ code });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
