import { Request, Response, NextFunction } from "express";
import RoleService from "../../app/dash/services/role.service";
import PermissionService from "../../app/dash/services/permission.service";

const service = new RoleService();
const servicePermission = new PermissionService();

export const getAllRoleByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await service.findAllByCustomerId(
      Number(req.params.customerId)
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
    const roleModel = await service.findOne(id);
    const { dataValues } = roleModel;
    const permissions = await servicePermission.findAllByRoleId(Number(id));
    const permissionsIds = permissions.map((item) => item.id);
    res.json({ ...dataValues, permissions: permissionsIds });
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
