import Joi from "joi";
import { CityType } from "../types/city.type";

const id = Joi.number();
const customerId = Joi.number();
const name = Joi.string().min(1).max(50);

const createCitySchema = Joi.object<Omit<CityType, "id">, true>({
  name: name.required(),
  customerId: customerId.required(),
});

const updateCitySchema = Joi.object<Omit<CityType, "id">, true>({
  name: name,
  customerId: customerId.required(),
});

const getCitySchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getCitiesSchema = Joi.object<{ customerId: number }, true>({
  customerId: customerId.required(),
});

export default {
  createCitySchema,
  updateCitySchema,
  getCitySchema,
  getCitiesSchema,
};
