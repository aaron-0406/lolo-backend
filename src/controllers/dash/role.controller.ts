import { Request, Response, NextFunction } from "express";
import RoleService from "../../app/dash/services/role.service";
import PermissionService from "../../app/dash/services/permission.service";
import UserLogService from "../../app/dash/services/user-log.service";
import rolesModel from "../../db/models/roles.model";

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

    const { visible } = req.query

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P11-04",
        entity: ROLE_TABLE,
        entityId: Number(req.params.customerId),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P11-01",
      entity: ROLE_TABLE,
      entityId: Number(newRole.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
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
    const role = await service.update(id, body, body.permissions);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P11-02",
      entity: ROLE_TABLE,
      entityId: Number(role.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P11-03",
      entity: ROLE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
