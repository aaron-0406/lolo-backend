import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { PermissionType } from "../types/permission.type";
import { Op } from "sequelize";

const { models } = sequelize;

class PermissionService {
  constructor() {}

  async findAll(code?: string): Promise<PermissionType[]> {
    const rta = await models.PERMISSION.findAll({
      where: {
        code: {
          [Op.like]: code ? `${code}%` : "%",
        },
      },
    });
    return rta.map((permission) => ({
      id: permission.dataValues.id,
      name: permission.dataValues.name,
      code: permission.dataValues.code,
      icon: permission.dataValues.icon,
      link: permission.dataValues.link,
      idPermissionMain: permission.dataValues.idPermissionMain,
      isDropdown: permission.dataValues.isDropdown,
    }));
  }

  async findAllByRoleId(roleId: number): Promise<PermissionType[]> {
    const rtaRolePermission = await models.ROLE_PERMISSION.findAll({
      where: {
        roleId,
      },
    });
    const permissionIds = rtaRolePermission.map((rolePermission) => {
      return rolePermission.dataValues.permissionId;
    });

    const rta = await models.PERMISSION.findAll({
      where: {
        id: { [Op.in]: permissionIds },
      },
    });
    return rta.map((permission) => ({
      id: permission.dataValues.id,
      name: permission.dataValues.name,
      code: permission.dataValues.code,
      icon: permission.dataValues.icon,
      link: permission.dataValues.link,
      idPermissionMain: permission.dataValues.idPermissionMain,
      isDropdown: permission.dataValues.isDropdown,
    }));
  }

  async findOne(id: string) {
    const permission = await models.PERMISSION.findByPk(id);

    if (!permission) {
      throw boom.notFound("Permiso no encontrado");
    }
    return permission;
  }

  async create(data: PermissionType) {
    const newPermission = await models.PERMISSION.create(data);
    return newPermission;
  }

  async update(id: string, changes: Partial<PermissionType>) {
    const permission = await this.findOne(id);
    const rta = await permission.update(changes);
    return rta;
  }

  async delete(id: string) {
    const permission = await this.findOne(id);
    await permission.destroy();

    return { id };
  }
}

export default PermissionService;
