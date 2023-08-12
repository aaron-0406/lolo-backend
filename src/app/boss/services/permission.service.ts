import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { PermissionType } from "../types/permission.type";

const { models } = sequelize;

class PermissionService {
  constructor() {}

  async findAll() {
    const rta = await models.PERMISSION.findAll();
    return rta;
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
  private buildTree(
    permissions: PermissionType[],
    codeLength: number
  ): PermissionType[] {
    const newPermissions = permissions
      .map((item) => {
        return {
          ...item,
          sons: permissions.filter(
            (item2) =>
              item2.code.startsWith(item.code) && item2.code !== item.code
          ),
        };
      })
      .filter((item) => item.code.length === codeLength)
      .map((item) => {
        return { ...item, sons: this.buildTree(item.sons, codeLength + 3) };
      });

    return newPermissions;
  }
}

export default PermissionService;
