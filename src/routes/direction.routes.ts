import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import directionSchema from "../app/extrajudicial/schemas/direction.schema";
import DirectionService from "../app/extrajudicial/services/direction.service";

const {
  createDirectionSchema,
  updateDirectionSchema,
  getDirectionByClientIDSchema,
  getDirectionByIDSchema,
} = directionSchema;

const router = express.Router();
const service = new DirectionService();

router.get("/", async (req, res, next) => {
  try {
    const directions = await service.findAll();
    res.json(directions);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/all-client/:clientId",
  validatorHandler(getDirectionByClientIDSchema, "params"),
  async (req, res, next) => {
    try {
      const { clientId } = req.params;
      const directions = await service.findAllByClient(clientId);
      res.json(directions);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getDirectionByIDSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const direction = await service.findByID(id);
      res.json(direction);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createDirectionSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newDirection = await service.create(body);
      console.log(newDirection)
      res.status(201).json(newDirection);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getDirectionByIDSchema, "params"),
  validatorHandler(updateDirectionSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const direction = await service.update(id, body);
      res.json(direction);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getDirectionByIDSchema, "params"),
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
