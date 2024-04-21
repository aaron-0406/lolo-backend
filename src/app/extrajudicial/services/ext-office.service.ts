import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtOfficeType } from "../types/ext-office.type";

const { models } = sequelize;

class ExtOfficeService {
  constructor() {}

  async findAllByCustomerId(customerId: string) {
    const rta = await models.EXT_OFFICE.findAll({
      where: {
        customer_id_customer: customerId,
      },
    });
    return rta;
  }

  async findAllByCityId(cityId: string) {
    const rta = await models.EXT_OFFICE.findAll({
      where: {
        cityId,
      },
    });
    return rta;
  }

  async findByID(id: string, customerId: string) {
    const rta = await models.EXT_OFFICE.findOne({
      where: {
        id,
        customer_id_customer: customerId,
      },
    });

    if (!rta) {
      throw boom.notFound("Oficina no encontrada");
    }

    return rta;
  }

  async create(data: ExtOfficeType) {
    const newExtIpOffice = await models.EXT_OFFICE.create(data);
    return newExtIpOffice;
  }

  async update(id: string, changes: ExtOfficeType) {
    const extOffice = await this.findByID(id, String(changes.customerId));
    const rta = await extOffice.update(changes);

    return rta;
  }

  async updateState(id: string, customerId: string, state: boolean) {
    const extOffice = await this.findByID(id, customerId);
    const rta = await extOffice.update({ ...extOffice, state });

    return rta;
  }

  async delete(id: string, customerId: string) {
    const extOffice = await this.findByID(id, customerId);
    await extOffice.destroy();

    return { id };
  }
}

export default ExtOfficeService;
