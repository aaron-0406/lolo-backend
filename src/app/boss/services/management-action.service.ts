import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ManagementActionType } from "../types/management-action.type";

const { models } = sequelize;

class ManagementActionService {
  constructor() {}

  async findAll() {
    const rta = await models.MANAGEMENT_ACTION.findAll();
    return rta;
  }

  async findOne(id: string) {
    const managementAction = await models.MANAGEMENT_ACTION.findByPk(id);

    if (!managementAction) {
      throw boom.notFound("Acción no encontrada");
    }
    return managementAction;
  }

  async create(data: ManagementActionType) {
    const newManagementAction = await models.MANAGEMENT_ACTION.create(data);
    return newManagementAction;
  }

  async update(id: string, changes: ManagementActionType) {
    const managementAction = await this.findOne(id);
    const rta = await managementAction.update(changes);

    return rta;
  }

  async delete(id: string) {
    const managementAction = await this.findOne(id);
    await managementAction.destroy();

    return { id };
  }
}

export default ManagementActionService;
