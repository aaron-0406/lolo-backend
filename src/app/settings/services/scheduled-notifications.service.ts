import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduledNotificationType } from "../types/scheduled-notifications.type";

const { models } = sequelize;
class ScheduledNotificationsService {
  constructor() {}

  async findAllByChb(chb: string) {
    const rta = await models.SCHEDULED_NOTIFICATIONS.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!rta) {
      throw boom.notFound("No existen notificaciones programadas");
    }

    return rta;
  }

  async create(data: ScheduledNotificationType) {
    const newScheduledNotification =
      await models.SCHEDULED_NOTIFICATIONS.create(data);
    return newScheduledNotification;
  }

  async update(id: string, data: ScheduledNotificationType) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATIONS.findByPk(
      id
    );

    if (!scheduledNotification) {
      throw boom.notFound("Notificación programada no encontrada");
    }

    await scheduledNotification.update(data);
    return scheduledNotification;
  }

  async delete(id: string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATIONS.findByPk(
      id
    );

    if (!scheduledNotification) {
      throw boom.notFound("Notificación programada no encontrada");
    }

    await scheduledNotification.destroy();
    return scheduledNotification;
  }
}

export default ScheduledNotificationsService;
