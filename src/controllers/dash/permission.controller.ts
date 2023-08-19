import { Request, Response, NextFunction } from "express";
import PermissionService from "../../app/dash/services/permission.service";
import { buildTree } from "../../libs/helpers";
import { PermissionType } from "../../app/dash/types/permission.type";

const service = new PermissionService();

export const getAllPermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissions: PermissionType[] = await service.findAll();
    const tree = buildTree(permissions, 3);
    res.json(tree);
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
