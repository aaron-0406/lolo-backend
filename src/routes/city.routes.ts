import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import citySchema from "../app/boss/schemas/city.schema";
import CityService from "../app/boss/services/city.service";

const { getCitySchema, createCitySchema, updateCitySchema } = citySchema;
const router = express.Router();
const service = new CityService();

router.get("/", async (req, res, next) => {
  try {
    const cities = await service.findAll();
    res.json(cities);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getCitySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const city = await service.findOne(id);
      res.json(city);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createCitySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCity = await service.create(body);
      res.status(201).json(newCity);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getCitySchema, "params"),
  validatorHandler(updateCitySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const city = await service.update(id, body);
      res.json(city);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getCitySchema, "params"),
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
