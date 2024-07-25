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

  async findAllByCHB(chb: string) {
    const rta = await models.MANAGEMENT_ACTION.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
      include: [
        {
          model: models.CUSTOMER_HAS_BANK,
          as: "customerHasBank",
        },
      ],
      order: [["nameAction", "ASC"]],
    });

    if (!rta) throw boom.notFound("Acción no encontrada");

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
    const oldManagementAction = { ...managementAction.get() };
    const newManagementAction = await managementAction.update(changes);

    return { oldManagementAction, newManagementAction };
  }

  async delete(id: string) {
    const managementAction = await this.findOne(id);
    const oldManagementAction = { ...managementAction.get() };
    await managementAction.destroy();

    return oldManagementAction;
  }
}

export default ManagementActionService;
