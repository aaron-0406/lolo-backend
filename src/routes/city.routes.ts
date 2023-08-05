import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import citySchema from "../app/boss/schemas/city.schema";
import CityService from "../app/boss/services/city.service";
import {
  createCityController,
  deleteCityController,
  getAllCityController,
  getCityByIdController,
  updateCityController,
} from "../controllers/city.controller";

const { getCitySchema, createCitySchema, updateCitySchema } = citySchema;
const router = express.Router();

router.get("/", getAllCityController);

router.get(
  "/:id",
  validatorHandler(getCitySchema, "params"),
  getCityByIdController
);

router.post(
  "/",
  validatorHandler(createCitySchema, "body"),
  createCityController
);

router.put(
  "/:id",
  validatorHandler(getCitySchema, "params"),
  validatorHandler(updateCitySchema, "body"),
  updateCityController
);

router.delete(
  "/:id",
  validatorHandler(getCitySchema, "params"),
  deleteCityController
);

export default router;
