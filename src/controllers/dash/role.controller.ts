import { Request, Response, NextFunction } from "express";
import RoleService from "../../app/dash/services/role.service";

const service = new RoleService();

export const getAllRoleByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await service.findAllByCustomerId(
      Number(req.query.customerId)
    );
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRoleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const role = await service.findOne(id);
    res.json(role);
  } catch (error) {
    next(error);
  }
};

export const createRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newRole = await service.create(body, body.permissions);
    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

export const updateRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const role = await service.update(id, body, body.permissions);
    res.json(role);
  } catch (error) {
    next(error);
  }
};

export const deleteRoleController = async (
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
