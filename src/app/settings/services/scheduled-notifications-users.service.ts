import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduledNotificationType } from "../types/scheduled-notifications.type";
import { ScheduledNotificationsUsersType } from "../types/scheduled-notifications-users.type";

const { models } = sequelize;
class ScheduledNotificationsUsersService {
  constructor() {}

  async findAll() {
    const rta = await models.SCHEDULED_NOTIFICATIONS_USERS.findAll();
    return rta;
  }

  async findOne(id: string) {
    const scheduledNotification =
      await models.SCHEDULED_NOTIFICATIONS_USERS.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Notificación Programada no encontrada");
    }

    return scheduledNotification;
  }

  async findAllByChbId(customerHasBankId: string) {
    const rta = await models.SCHEDULED_NOTIFICATIONS_USERS.findAll({
      where: {
        customerHasBankId: customerHasBankId,
      },
    });

    if (!rta) {
      throw boom.notFound("No existen notificaciones programadas");
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

  async changeNotificationsUsers(
    idNotification: string,
    scheludeNotificationsUsers: string
  ) {
    const newScheludeNotificationsUsers: ScheduledNotificationsUsersType[] =
      JSON.parse(scheludeNotificationsUsers);
    const notifications = await models.SCHEDULED_NOTIFICATIONS_USERS.findAll({
      where: {
        scheduledNotificationId: idNotification,
      },
    });
    if (notifications.length) {
      const newNotifications = newScheludeNotificationsUsers.filter(
        (scheludeNotificationsUser: ScheduledNotificationsUsersType) =>
          !notifications.some(
            (notification) =>
              notification.dataValues.customerUserId ===
              scheludeNotificationsUser.customerUserId
          )
      );
      const notificationsToDelete = notifications.filter(
        (notification) =>
          !newScheludeNotificationsUsers.some(
            (scheludeNotificationsUser) =>
              notification.dataValues.customerUserId ===
              scheludeNotificationsUser.customerUserId
          )
      );

      try {
        for (const notification of notificationsToDelete) {
          await models.SCHEDULED_NOTIFICATIONS_USERS.destroy({
            where: { customerUserId: notification.dataValues.customerUserId },
          });
        }

        for (const newNotification of newNotifications) {
          await models.SCHEDULED_NOTIFICATIONS_USERS.create(newNotification);
        }
        return newScheludeNotificationsUsers;
      } catch (error) {
        throw error;
      }
    } else {
      for (const newNotification of newScheludeNotificationsUsers) {
        await models.SCHEDULED_NOTIFICATIONS_USERS.create(newNotification);
      }
    }
  }

  async update(id: string, data: ScheduledNotificationType) {
    const scheduledNotification =
      await models.SCHEDULED_NOTIFICATIONS_USERS.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    await scheduledNotification.update(data);
    return scheduledNotification;
  }

  async delete(id: string) {
    const scheduledNotification =
      await models.SCHEDULED_NOTIFICATIONS_USERS.findByPk(id);

    if (!scheduledNotification) {
      throw boom.notFound("Scheduled Notification no encontrado");
    }

    await scheduledNotification.destroy();
    return { id };
  }
}

export default ScheduledNotificationsUsersService;
