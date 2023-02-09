import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import clientSchema from "../app/extrajudicial/schemas/client.schema";
import ClientService from "../app/extrajudicial/services/client.service";

const {
  getClientByCHBSchema,
  getClientByCodeSchema,
  createClientSchema,
  updateClientSchema,
  getClientByBank,
  deleteClientByCodeSchema,
  getClientByCHBSchemaQuery,
} = clientSchema;
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
  "/:chb",
  validatorHandler(getClientByCHBSchema, "params"),
  validatorHandler(getClientByCHBSchemaQuery, "query"),
  async (req, res, next) => {
    try {
      const { chb } = req.params;
      const { clients, quantity } = await service.findAllCHB(chb, req.query);
      res.json({ clients, quantity });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:chb/details",
  validatorHandler(getClientByCHBSchema, "params"),
  async (req, res, next) => {
    try {
      const { chb } = req.params;
      const clients = await service.findAllCHBDetails(chb);
      res.json(clients);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:code/:chb",
  validatorHandler(getClientByCodeSchema, "params"),
  async (req, res, next) => {
    try {
      const { code, chb } = req.params;
      const client = await service.findCode(code, chb);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:idBank",
  validatorHandler(getClientByBank, "params"),
  validatorHandler(createClientSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newClient = await service.create(body, Number(req.params.idBank));
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:code/:chb",
  validatorHandler(getClientByCodeSchema, "params"),
  validatorHandler(updateClientSchema, "body"),
  async (req, res, next) => {
    try {
      const { code, chb } = req.params;
      const body = req.body;
      const client = await service.update(code, chb, body);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:code/:chb/:idBank",
  validatorHandler(deleteClientByCodeSchema, "params"),
  async (req, res, next) => {
    try {
      const { code, chb, idBank } = req.params;
      await service.delete(code, chb, Number(idBank));
      res.status(201).json({ code, chb });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
