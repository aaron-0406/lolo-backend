import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduledNotificationType } from "../types/scheduled-notification.type";

const { models } = sequelize;
class ScheduledNotificationService {
  constructor() {}

  async findAll() {
    const rta = await models.SCHEDULED_NOTIFICATION.findAll();
    return rta;
  }

  async findOne (id: string) {
    const rta = await models.SCHEDULED_NOTIFICATION.findByPk(id);

    if (!rta) {
      throw boom.notFound("Notificación programada no encontrada");
    }
    return rta;
  }

  async findOneById(id: string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATION.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Notificación programada no encontrada");
    }

    return scheduledNotification;
  }

  async findAllByChb(chb: string) {
    const rta = await models.SCHEDULED_NOTIFICATION.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
      // include: ["notification"],
    });

    if (!rta) {
      throw boom.notFound("El cliente no tiene notificaciones programadas");
    }

    return rta;
  }

  async findAllByLogicKey(logicKey: string) {
    const rta = await models.SCHEDULED_NOTIFICATION.findAll({
      where: {
        logic_key: logicKey,
      },
    });

    if (!rta) {
      throw boom.notFound("No se encontraron notificaciones programadas");
    }

    return rta;
  }

  async create (data: ScheduledNotificationType) {
    const newScheduledNotification = await models.SCHEDULED_NOTIFICATION.create(data);
    return newScheduledNotification;
  }

  async update (id: string, data: ScheduledNotificationType) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATION.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Notificación programada no encontrada");
    }

    await scheduledNotification.update(data);
    return scheduledNotification;
  }

  async delete (id: string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATION.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Notificación programada no encontrada");
    }

    await scheduledNotification.destroy();
    return scheduledNotification;
  }
}

export default ScheduledNotificationService;
