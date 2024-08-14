import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { TariffIntervalType } from "../types/tariff-interval.type";

const { models } = sequelize;

class TariffIntervalService {
  constructor() {}

  async findAll() {
    const rta = await models.TARIFF_INTERVAL.findAll();

    if (!rta) {
      throw boom.notFound("No existen intervalos");
    }

    return rta;
  }

  async findAllByTariff(tariffId: string) {
    const rta = await models.TARIFF_INTERVAL.findAll({
      where: {
        tariffId,
      },
    });

    if (!rta) {
      throw boom.notFound("No existen intervalos");
    }

    return rta;
  }

  async create(data: TariffIntervalType) {
    const newTariffInterval = await models.TARIFF_INTERVAL.create(data);

    return newTariffInterval;
  }

  async update(id: string, data: TariffIntervalType) {
    const tariffInterval = await models.TARIFF_INTERVAL.findByPk(id);

    if (!tariffInterval) {
      throw boom.notFound("Tarifa no encontrada");
    }

    await tariffInterval.update(data);

    return tariffInterval;
  }

  async delete(id: string) {
    const tariffInterval = await models.TARIFF_INTERVAL.findByPk(id);

    if (!tariffInterval) {
      throw boom.notFound("Tarifa no encontrada");
    }

    await tariffInterval.destroy();

    return { id };
  }
}
export default TariffIntervalService;