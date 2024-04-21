import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import citySchema from "../../app/dash/schemas/city.schema";
import {
  createCityController,
  deleteCityController,
  getAllCityController,
  getCityByIdController,
  updateCityController,
} from "../../controllers/dash/city.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { getCitySchema, createCitySchema, updateCitySchema, getCitiesSchema } =
  citySchema;
const router = express.Router();

router.get(
  "/customer/:customerId",
  JWTAuth,
  validatorHandler(getCitiesSchema, "params"),
  getAllCityController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getCitySchema, "params"),
  getCityByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createCitySchema, "body"),
  createCityController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getCitySchema, "params"),
  validatorHandler(updateCitySchema, "body"),
  updateCityController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getCitySchema, "params"),
  deleteCityController
);

export default router;
