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
    });

    if (!rta) throw boom.notFound("Acción no encontrada");

    return rta;
  }

  async findAllByCHBPaginated(chb: string, query: any) {
    const { limit, page } = query;

    const limite = parseInt(limit, 10);
    const pagina = parseInt(page, 10);

    const quantity = await models.CLIENT.count({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    const pages = limit / quantity;
    //agregar lógica para que no retorne un decimal, si no un número entero

    const data = await models.MANAGEMENT_ACTION.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
      include: [
        {
          model: models.CUSTOMER_HAS_BANK,
          as: "customerHasBank",
        },
      ],
      order: [["id", "DES"]],
      limit: limite,
      offset: (pagina - 1) * limite,
    });

    if (!data) throw boom.notFound("Acción no encontrada");

    return { data, quantity, pages };
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
