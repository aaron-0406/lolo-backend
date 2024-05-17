import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduledNotificationType } from "../types/scheduled-notification.type";
import { createFolder } from "../../../libs/aws_bucket";
import config from "../../../config/config";

const { models } = sequelize;
class ScheduledNotificationService {
  constructor() {}

  async findAll() {
    const rta = await models.SCHEDULED_NOTIFICATION.findAll();
    return rta;
  }

  async findOneById(id: string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATION.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    return scheduledNotification;
  }

  async findAllByCustomerId(customerId: string) {
    const rta = await models.SCHEDULED_NOTIFICATION.findAll({
      where: {
        customerHasBankId: customerId,
      },
    });

    if (!rta) {
      throw boom.notFound("El cliente no tiene notificaciones programadas");
    }

    return rta;
  }

  async update (id: string, data: ScheduledNotificationType) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATION.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    await scheduledNotification.update(data);
    return scheduledNotification;
  }

  async delete(id: string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATION.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    await scheduledNotification.destroy();
    return { id };
  }
}