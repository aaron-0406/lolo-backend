import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { TariffType } from "../types/tariff.type";

const { models } = sequelize;

class TariffService {
  constructor() {}

  async findAll() {
    const rta = await models.TARIFF.findAll();

    if (!rta) {
      throw boom.notFound("No existen tarifas");
    }

    return rta;
  }

  async findAllByType(type: string) {
    const rta = await models.TARIFF.findAll({
      where: {
        type,
      },
    });

    if (!rta) {
      throw boom.notFound("No existen tarifas");
    }

    return rta;
  }

  async create(data: TariffType) {
    const newTariff = await models.TARIFF.create(data)

    return newTariff;
  }

  async update(id: string, data: TariffType) {
    const tariff = await models.TARIFF.findByPk(id);

    if (!tariff) {
      throw boom.notFound("Tarifa no encontrada");
    }

    await tariff.update(data);

    return tariff;
  }

  async delete(id: string) {
    const tariff = await models.TARIFF.findByPk(id);

    if (!tariff) {
      throw boom.notFound("Tarifa no encontrada");
    }

    await tariff.destroy();

    return { id };
  }
}

export default TariffService;