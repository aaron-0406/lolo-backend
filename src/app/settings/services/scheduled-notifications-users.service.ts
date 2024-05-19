import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduledNotificationType } from "../types/scheduled-notifications.type";
import { ScheduledNotificationsUsersType } from '../types/scheduled-notifications-users.type';

const { models } = sequelize;
class ScheduledNotificationsUsersService {
  constructor() {}

  async findAll() {
    const rta = await models.SCHEDULED_NOTIFICATIONS_USERS.findAll();
    return rta;
  }

  async findOne (id:string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATIONS_USERS.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    return scheduledNotification;
  }

  async findOneById(id: string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATIONS_USERS.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    return scheduledNotification;
  }

  async findAllByCustomerId(customerId: string) {
    const rta = await models.SCHEDULED_NOTIFICATIONS_USERS.findAll({
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
    const rta = await models.SCHEDULED_NOTIFICATIONS_USERS.findAll({
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
    const rta = await models.SCHEDULED_NOTIFICATIONS_USERS.findAll({
      where: {
        scheduledNotificationId: scheduledNotificationId,
      },
    });

    if (!rta) {
      throw boom.notFound("El cliente no tiene notificaciones programadas");
    }

    return rta;
  }

  async save( notificationID:number ,scheludeNotificationsUsers: ScheduledNotificationsUsersType[]) {
    const notifications = await models.SCHEDULED_NOTIFICATIONS_USERS.findAll({
      where: {
        id_scheduled_notification_user: notificationID,
      },
    });


    const rta = await models.SCHEDULED_NOTIFICATIONS_USERS.bulkCreate(scheludeNotificationsUsers);
    return rta;

  }

  async create (data: ScheduledNotificationType) {
    const newScheduledNotification = await models.SCHEDULED_NOTIFICATIONS_USERS.create(data);
    return newScheduledNotification;
  }

  async update (id: string, data: ScheduledNotificationType) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATIONS_USERS.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    await scheduledNotification.update(data);
    return scheduledNotification;
  }

  async delete(id: string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATIONS_USERS.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    await scheduledNotification.destroy();
    return { id };
  }
}

export default ScheduledNotificationsUsersService;