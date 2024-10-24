import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { TariffType } from "../types/tariff.type";
import { Model } from "sequelize";

const { models } = sequelize;

const TariffType = {
  CONTENTIOUS_PROCESS: "PROCESOS CONTENCIOSOS",
  REQUEST_OF: "POR SOLICITUD DE",
  BY_EXHORT_PROCESS:"POR TRAMITE DE EXHORTO",
  CUSTOM_TARIFF: "TARIFA PERSONALIZADA"
};

class TariffService {
  constructor() {}

  async findAll(chb: number) {
    let contentiousProcessesHeaders: any[] = [];
    let requestOfHeaders: any[] = [];
    let byExhortProcessHeaders: any[] = [];
    let customTariffHeaders: any[] = [];

    const rta = await models.TARIFF.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
      include: [
        {
          model: models.TARIFF_INTERVAL_MATCH,
          as: "tariffIntervalMatch",
          include: [
            {
              model: models.TARIFF_INTERVAL,
              as: "tariffInterval",
              attributes: [
                "id",
                "description",
                "interval",
                "intervalDescription",
              ],
            },
          ],
        },
      ],
    });

    if (!rta) {
      throw boom.notFound("No existen tarifas");
    }

    const contentiousProcesses = rta.filter(
      (tariff) => tariff.dataValues.type === TariffType.CONTENTIOUS_PROCESS
    );
    const requestOf = rta.filter(
      (tariff) => tariff.dataValues.type === TariffType.REQUEST_OF
    );
    const byExhortProcess = rta.filter(
      (tariff) => tariff.dataValues.type === TariffType.BY_EXHORT_PROCESS
    );
    const customTariff = rta.filter(
      (tariff) => tariff.dataValues.type === TariffType.CUSTOM_TARIFF
    );

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

    if (!byExhortProcess.length) return;

    if (!byExhortProcess[0].dataValues.tariffIntervalMatch.length) return;

    if (!customTariff.length) return;

    if (!customTariff[0].dataValues.tariffIntervalMatch.length) return;

    return {
      contentiousProcessesHeaders,
      requestOfHeaders,
      contentiousProcesses,
      requestOf,
      byExhortProcessHeaders,
      byExhortProcess,
      customTariffHeaders,
      customTariff,
    };
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
          include: [
            {
              model: models.TARIFF_INTERVAL,
              as: "interval",
              attributes: [
                "id",
                "description",
                "interval",
                "intervalDescription",
              ],
            },
          ],
        },
      ],
    });

    if (!rta) {
      throw boom.notFound("No existen tarifas");
    }

    return rta;
  }

  async findById(id: string): Promise<Model | null> {
    const tariff = await models.TARIFF.findByPk(id);
    if (!tariff) {
      boom.notFound("Tarifa no encontrada")
      return null;
    } ;

    return tariff;
  }

  async create(data: Omit<TariffType, "id" | "tariffIntervalMatch">) {
    const newTariff = await models.TARIFF.create({
      code: data.code,
      type: data.type,
      description: data.description,
      customerHasBankId: data.customerHasBankId,
    });

    if(!newTariff) {
      boom.notFound("Hubo un error al crear el tarifa")
      return ;
    };

    if(data.type === TariffType.CUSTOM_TARIFF || data.type === TariffType.BY_EXHORT_PROCESS) {
      try {
        await models.TARIFF_INTERVAL_MATCH.create({
          tariffId: newTariff.dataValues.id,
          intervalId: 20,
          value: data.value,
        });
      } catch (error) {
        return console.log(error)
      }
    }

    const tariffInterval = await models.TARIFF.findByPk(newTariff.dataValues.id, {
      include: [
        {
          model: models.TARIFF_INTERVAL_MATCH,
          as: "tariffIntervalMatch",
          include: [
            {
              model: models.TARIFF_INTERVAL,
              as: "tariffInterval",
              attributes: [
                "id",
                "description",
                "interval",
                "intervalDescription",
              ],
            },
          ],
        },
      ],
    });

    if(!tariffInterval) {
      boom.notFound("Tarifa no encontrada")
      return ;
    };

    return tariffInterval;

  }

  async update(id:number, data: Omit<TariffType, "id" | "tariffIntervalMatch">): Promise<{ oldTariff: Model | null, newTariff: Model | null } > {
    const tariff = await models.TARIFF.findByPk(id, {
      include: [
        {
          model: models.TARIFF_INTERVAL_MATCH,
          as: "tariffIntervalMatch",
          include: [
            {
              model: models.TARIFF_INTERVAL,
              as: "tariffInterval",
              attributes: [
                "id",
                "description",
                "interval",
                "intervalDescription",
              ],
            },
          ],
        },
      ],
    });
    if (!tariff) {
      boom.notFound("Tarifa no encontrada");
      return { oldTariff: null, newTariff: null };
    }

    const oldTariff = { ...tariff.get() };

    await tariff.update({
      code: data.code,
      type: data.type,
      description: data.description,
    });
    const tariffIntervalMatch = await models.TARIFF_INTERVAL_MATCH.findAll({
      where: {
        tariffId: id,
      },
    });

    if (!tariffIntervalMatch.length) {
      boom.notFound("Tarifa no encontrada")
      return { oldTariff: null, newTariff: null };
    }
    if (
      data.type === TariffType.CUSTOM_TARIFF ||
      data.type === TariffType.BY_EXHORT_PROCESS
    ) {
      try {
        await tariffIntervalMatch[0].update({
          value: data.value,
        });
      } catch (error) {
        boom.badRequest("Hubo un error al crear el interval match de tarifas");
        return { oldTariff: null, newTariff: null };
      }
    }

    const newTariff = await models.TARIFF.findByPk(tariff.dataValues.id, {
      include: [
        {
          model: models.TARIFF_INTERVAL_MATCH,
          as: "tariffIntervalMatch",
          include: [
            {
              model: models.TARIFF_INTERVAL,
              as: "tariffInterval",
              attributes: [
                "id",
                "description",
                "interval",
                "intervalDescription",
              ],
            },
          ],
        },
      ],
    });
    return { oldTariff, newTariff };
  }

  async delete(id: string) {
    const tariff = await this.findById(id);
    if (!tariff) return null
    const oldTariff = { ...tariff.get() };
    await models.TARIFF_INTERVAL_MATCH.destroy({
      where: {
        tariffId: id,
      },
    });
    await models.TARIFF.destroy({
      where: {
        id: id,
      },
    });

    return oldTariff;

  }
}

export default TariffService;