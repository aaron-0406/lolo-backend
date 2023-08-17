import { Request, Response, NextFunction } from "express";
import CityService from "../../app/boss/services/city.service";

const service = new CityService();

export const getAllCityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cities = await service.findAll();
    res.json(cities);
  } catch (error) {
    next(error);
  }
};

export const getCityByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const city = await service.findOne(id);
    res.json(city);
  } catch (error) {
    next(error);
  }
};

export const createCityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newCity = await service.create(body);
    res.status(201).json(newCity);
  } catch (error) {
    next(error);
  }
};

export const updateCityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const city = await service.update(id, body);
    res.json(city);
  } catch (error) {
    next(error);
  }
};

export const deleteCityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
