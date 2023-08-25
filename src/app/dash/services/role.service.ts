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
    const rta = await role.update(changes);
    await models.ROLE_PERMISSION.destroy({
      where: {
        roleId: role.dataValues.id,
      },
    });
    for (let i = 0; i < permissions.length; i++) {
      const element = permissions[i];
      await models.ROLE_PERMISSION.create({
        roleId: role.dataValues.id,
        permissionId: element,
      });
    }
    return rta;
  }

  async delete(id: string) {
    const role = await this.findOne(id);
    await models.ROLE_PERMISSION.destroy({
      where: { roleId: id },
    });
    await role.destroy();
    return { id };
  }
}

export default RoleService;
