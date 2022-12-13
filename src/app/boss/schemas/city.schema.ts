import Joi from "joi";
import { CityType } from "../types/city.type";

const id = Joi.number();
const name = Joi.string().min(1).max(50);

const createCitySchema = Joi.object<CityType, true>({
  id: id.required(),
  name: name.required(),
});

const getCitySchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createCitySchema, getCitySchema };
