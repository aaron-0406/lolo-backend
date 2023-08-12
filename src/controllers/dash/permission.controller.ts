import { Request, Response, NextFunction } from "express";
import PermissionService from "../../app/boss/services/permission.service";

const service = new PermissionService();

export const getAllPermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissions = await service.findAll();
    res.json(permissions);
  } catch (error) {
    next(error);
  }
};

export const getPermissionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const permission = await service.findOne(id);
    res.json(permission);
  } catch (error) {
    next(error);
  }
};

export const createPermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newPermission = await service.create(body);
    res.status(201).json(newPermission);
  } catch (error) {
    next(error);
  }
};

export const updatePermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const permission = await service.update(id, body);
    res.json(permission);
  } catch (error) {
    next(error);
  }
};

export const deletePermissionController = async (
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
