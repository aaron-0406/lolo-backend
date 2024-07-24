import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { RoleType } from "../types/role.type";

const { models } = sequelize;

class RoleService {
  constructor() {}

  async findAllByCustomerId(customerId: number) {
    const rta = await models.ROLE.findAll({
      where: {
        customerId,
      },
    });
    return rta;
  }

  async findOne(id: string) {
    const role = await models.ROLE.findByPk(id);

    if (!role) {
      throw boom.notFound("Rol no encontrado");
    }
    return role;
  }

  async create(data: RoleType, permissions: Array<number>) {
    const newRole = await models.ROLE.create(data);
    for (let i = 0; i < permissions.length; i++) {
      const element = permissions[i];
      await models.ROLE_PERMISSION.create({
        roleId: newRole.dataValues.id,
        permissionId: element,
      });
    }
    return newRole;
  }

  async update(
    id: string,
    changes: Partial<RoleType>,
    permissions: Array<number>
  ) {
    const role = await this.findOne(id);
    const oldRole = {...role.get()};
    const oldRolePermissions = await models.ROLE_PERMISSION.findAll({
      where: {
        roleId: role.dataValues.id,
      },
    });

    const formatOldRolePermissions = oldRolePermissions.map((item) => item.dataValues);

    const permissionsToDelete = formatOldRolePermissions.filter((item) => !permissions.includes(item.permissionId));
    const permissionWithoutChanges = formatOldRolePermissions.filter((item) => permissions.includes(item.permissionId));
    const permissionWithoutChangesIds = permissionWithoutChanges.map((item) => item.permissionId);

    await models.ROLE_PERMISSION.destroy({
      where: {
        roleId: role.dataValues.id,
      },
    });

    const newRole = await role.update(changes);
    for (let i = 0; i < permissions.length; i++) {
      const element = permissions[i];
      await models.ROLE_PERMISSION.create({
        roleId: role.dataValues.id,
        permissionId: element,
      });
    }

    const newRolePermissions = await models.ROLE_PERMISSION.findAll({
      where: {
        roleId: role.dataValues.id,
      },
    });

    const formatNewRolePermissions = newRolePermissions.map((item) => item.dataValues);
    const permissionsToAdd = formatNewRolePermissions.filter((item) => !permissionWithoutChangesIds.includes(item.permissionId));
    return { oldRole, newRole, permissionsToDelete, permissionWithoutChanges, permissionsToAdd };
  }

  async delete(id: string) {
    const role = await this.findOne(id);
    const oldRole = {...role.get()};
    await models.ROLE_PERMISSION.destroy({
      where: { roleId: id },
    });
    await role.destroy();
    return oldRole;
  }
}

export default RoleService;
