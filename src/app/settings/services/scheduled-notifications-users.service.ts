import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduledNotificationType } from "../types/scheduled-notification.type";

const { models } = sequelize;
class ScheduledNotificationsUsersService {
  constructor() {}

  async findAll() {
    const rta = await models.SCHEDULED_NOTIFICATION.findAll();
    return rta;
  }

  async findOne (id:string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATION.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    return scheduledNotification;
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

  async findAllByChbId(customerHasBankId: string) {
    const rta = await models.SCHEDULED_NOTIFICATION.findAll({
      where: {
        customerHasBankId: customerHasBankId,
      },
    });

    if (!rta) {
      throw boom.notFound("El cliente no tiene notificaciones programadas");
    }

    return rta;
  }

  async findAllByScheduledNotificationId(scheduledNotificationId: string) {
    const rta = await models.SCHEDULED_NOTIFICATION.findAll({
      where: {
        scheduledNotificationId: scheduledNotificationId,
      },
    });

    if (!rta) {
      throw boom.notFound("El cliente no tiene notificaciones programadas");
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

export default ScheduledNotificationsUsersService;