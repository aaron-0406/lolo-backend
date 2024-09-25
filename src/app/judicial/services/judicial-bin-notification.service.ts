import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinNotificationType } from "../types/judicial-bin-notification.type";

const { models } = sequelize;

class JudicialBinNotificationService {
  constructor() {}

  async findAllByBinnacleId(binnacleId: number) {
    const rta = await models.JUDICIAL_BIN_NOTIFICATION.findAll({
      where: {
        idJudicialBinacle: binnacleId,
      },
      attributes: {
        exclude: ["judicialBinnacleId"],
      },
    });
    if(!rta) throw boom.notFound("No se encontraron notificaciones");
    return rta;
  }

  async findByID(id: string) {
    const judicialBinNotification = await models.JUDICIAL_BIN_NOTIFICATION.findOne({
      where: {
        id,
      },
    });

    if (!judicialBinNotification) {
      throw boom.notFound("Notificaciones no encontradas");
    }

    return judicialBinNotification;
  }

  async create(data: JudicialBinNotificationType) {
    const newJudicialBinNotification = await models.JUDICIAL_BIN_NOTIFICATION.create(data);
    return newJudicialBinNotification;
  }

  async update(id: string, changes: JudicialBinNotificationType) {
    const judicialBinNotification = await this.findByID(id);
    const oldData = { ...judicialBinNotification.get() };
    const newData = (await judicialBinNotification.update(changes)).dataValues;
    return { oldData, newData };
  }

  async delete(id: string) {
    const judicialBinNotification = await this.findByID(id);
    const oldData = { ...judicialBinNotification.get() };
    await judicialBinNotification.destroy();

    return { oldData };
  }
}

export default JudicialBinNotificationService;
