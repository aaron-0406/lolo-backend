import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { TariffIntervalMatchType } from "../types/tariff-interval-match.type";

const { models } = sequelize;

class TariffIntervalMatchService {
  constructor() {}

  async findAll() {
    const rta = await models.TARIFF_INTERVAL_MATCH.findAll();

    if (!rta) {
      throw boom.notFound("No existen intervalos");
    }

    return rta;
  }

  async findAllByInterval(intervalId: string) {
    const rta = await models.TARIFF_INTERVAL_MATCH.findAll({
      where: {
        intervalId,
      },
    });

    if (!rta) {
      throw boom.notFound("No existen intervalos");
    }

    return rta;
  }

  async create(data: TariffIntervalMatchType) {
    const newTariffIntervalMatch = await models.TARIFF_INTERVAL_MATCH.create(data);

    return newTariffIntervalMatch;
  }

  async update(id: string, data: TariffIntervalMatchType) {
    const tariffIntervalMatch = await models.TARIFF_INTERVAL_MATCH.findByPk(id);

    if (!tariffIntervalMatch) {
      throw boom.notFound("Tarifa no encontrada");
    }

    await tariffIntervalMatch.update(data);

    return tariffIntervalMatch;
  }

  async delete(id: string) {
    const tariffIntervalMatch = await models.TARIFF_INTERVAL_MATCH.findByPk(id);

    if (!tariffIntervalMatch) {
      throw boom.notFound("Tarifa no encontrada");
    }

    await tariffIntervalMatch.destroy();

    return { id };
  }
}
export default TariffIntervalMatchService;