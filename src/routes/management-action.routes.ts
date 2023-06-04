import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import managementActionSchema from "../app/boss/schemas/management-action.schema";
import ManagementActionService from "../app/boss/services/management-action.service";

const {
  getManagementActionSchema,
  getManagementActionByCHBSchema,
  createManagementActionSchema,
  updateManagementActionSchema,
} = managementActionSchema;
const router = express.Router();
const service = new ManagementActionService();

router.get("/", async (req, res, next) => {
  try {
    const managementActions = await service.findAll();
    res.json(managementActions);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/all/:chb",
  validatorHandler(getManagementActionByCHBSchema, "params"),
  async (req, res, next) => {
    try {
      const { chb } = req.params;
      const managementActions = await service.findAllByCHB(chb);
      res.json(managementActions);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getManagementActionSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const managementAction = await service.findOne(id);
      res.json(managementAction);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createManagementActionSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newManagementAction = await service.create(body);
      res.status(201).json(newManagementAction);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getManagementActionSchema, "params"),
  validatorHandler(updateManagementActionSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const managementAction = await service.update(id, body);
      res.json(managementAction);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getManagementActionSchema, "params"),
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
