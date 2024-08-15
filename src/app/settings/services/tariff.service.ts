import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { TariffType } from "../types/tariff.type";

const { models } = sequelize;

const TariffType = {
  CONTENTIOUS_PROCESS: "PROCESOS CONTENCIOSOS",
  REQUEST_OF: "POR SOLICITUD DE",
};

class TariffService {
  constructor() {}

  async findAll() {
    let contentiousProcessesHeaders: any[] = [];
    let requestOfHeaders: any[] = [];

    const rta = await models.TARIFF.findAll(
      {
      include: [
        {
          model: models.TARIFF_INTERVAL_MATCH,
          as: "tariffIntervalMatch",
          include:[
            {
              model: models.TARIFF_INTERVAL,
              as: "tariffInterval",
              attributes: ["id", "description", "interval", "intervalDescription"],
            }
          ]
        }
      ],
    }
  );

  if (!rta) {
    throw boom.notFound("No existen tarifas");
  }

  const contentiousProcesses = rta.filter(tariff => tariff.dataValues.type === TariffType.CONTENTIOUS_PROCESS);
  const requestOf = rta.filter(tariff => tariff.dataValues.type === TariffType.REQUEST_OF);

    if (!contentiousProcesses.length) return;

    if (!contentiousProcesses[0].dataValues.tariffIntervalMatch.length) return;

        contentiousProcesses[0].dataValues.tariffIntervalMatch.forEach(
          (intervalMatch: any) => {
            contentiousProcessesHeaders.push({
              description:
                intervalMatch.dataValues.tariffInterval.dataValues.description,
              headerTitle:
                intervalMatch.dataValues.tariffInterval.dataValues
                  .intervalDescription,
            });
          }
        );

    if (!requestOf.length) return;

    console.log(requestOf[0].dataValues.tariffIntervalMatch);

    if (!requestOf[0].dataValues.tariffIntervalMatch.length) return;

        requestOf[0].dataValues.tariffIntervalMatch.forEach(
          (intervalMatch: any) => {
            requestOfHeaders.push({
              description:
                intervalMatch.dataValues.tariffInterval.dataValues.description,
              headerTitle:
                intervalMatch.dataValues.tariffInterval.dataValues
                  .intervalDescription,
            });
          }
        );


    return { contentiousProcessesHeaders, requestOfHeaders, contentiousProcesses, requestOf };

  }

  async findAllByType(type: string) {
    const rta = await models.TARIFF.findAll({
      where: {
        type,
      },
      include: [
        {
          model: models.TARIFF_INTERVAL_MATCH,
          as: "intervals",
          attributes: ["id", "value"],
          include:[
            {
              model: models.TARIFF_INTERVAL,
              as: "interval",
              attributes: ["id", "description", "interval", "intervalDescription"],
            }
          ]
        }
      ],
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