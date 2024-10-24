import { Request, Response, NextFunction } from "express";
import RoleService from "../../app/dash/services/role.service";
import PermissionService from "../../app/dash/services/permission.service";
import UserLogService from "../../app/dash/services/user-log.service";
import rolesModel from "../../db/models/roles.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new RoleService();
const servicePermission = new PermissionService();
const serviceUserLog = new UserLogService();

const { ROLE_TABLE } = rolesModel;

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

    const sumary = generateLogSummary({
      method: req.method,
      newData: newRole.dataValues,
      id: newRole.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P11-01",
      entity: ROLE_TABLE,
      entityId: Number(newRole.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

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
    const { oldRole, newRole, permissionsToDelete, permissionsToAdd, permissionWithoutChanges } = await service.update(id, body, body.permissions);

    const permissionsRolSumary = generateLogSummary({
      method: req.method,
      oldData: permissionsToDelete ?? [],
      newData: permissionsToAdd ?? [],
      withoutChanges: permissionWithoutChanges ?? [],
      name: ROLE_TABLE,
      id: newRole.dataValues.id,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P11-02",
      entity: ROLE_TABLE,
      entityId: Number(newRole.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: permissionsRolSumary,
    });

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldRole,
      newData: newRole.dataValues,
      id: newRole.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P11-02",
      entity: ROLE_TABLE,
      entityId: Number(newRole.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newRole);
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
    const oldRole = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldRole,
      id: oldRole.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P11-03",
      entity: ROLE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
