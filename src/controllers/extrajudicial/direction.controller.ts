import { Request, Response, NextFunction } from "express";
import DirectionService from "../../app/extrajudicial/services/direction.service";
const service = new DirectionService();

export const getAllDirectionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const directions = await service.findAll();
    res.json(directions);
  } catch (error) {
    next(error);
  }
};

export const getDirectionByClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const directions = await service.findAllByClient(clientId);
    res.json(directions);
  } catch (error) {
    next(error);
  }
};

export const getDirectionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const direction = await service.findByID(id);
    res.json(direction);
  } catch (error) {
    next(error);
  }
};

export const createDirectionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newDirection = await service.create(body);
    res.status(201).json(newDirection);
  } catch (error) {
    next(error);
  }
};

export const updateDirectionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const direction = await service.update(id, body);
    res.json(direction);
  } catch (error) {
    next(error);
  }
};

export const deleteDirectionController = async (
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
