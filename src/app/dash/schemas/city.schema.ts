import Joi from "joi";
import { CityType } from "../types/city.type";

const id = Joi.number();
const name = Joi.string().min(1).max(50);

const createCitySchema = Joi.object<Omit<CityType, "id">, true>({
  name: name.required(),
});

const updateCitySchema = Joi.object<Omit<CityType, "id">, true>({
  name: name,
});

const getCitySchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createCitySchema, updateCitySchema, getCitySchema };
