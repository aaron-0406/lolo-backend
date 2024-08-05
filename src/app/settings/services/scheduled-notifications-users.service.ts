import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduledNotificationsUsersType } from "../types/scheduled-notifications-users.type";

const { models } = sequelize;
class ScheduledNotificationsUsersService {
  constructor() {}

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
      include: [
        {
          model: models.CUSTOMER_USER,
          as: "customerUser",
          attributes: ["name", "email"],
        },
      ],
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

      const notificationsChanges = [
        ...notificationsToDelete.map((notification) => notification.dataValues),
        ...newNotifications,
      ];

      const notificationsWithoutChanges = notifications.filter(
        (notification) =>
          !notificationsChanges.some(
            (notificationChanges) =>
              notification.dataValues.customerUserId ===
              notificationChanges.customerUserId
          )
      );

      const formatedNotificationsWithoutChanges =
        notificationsWithoutChanges.map(
          (notification) => notification.dataValues.customerUser
        );
      const formatedNotificationsToDelete = notificationsToDelete.map(
        (notification) => notification.dataValues.customerUser
      );
      const formatedNewNotifications:any[] = [];

      try {
        for (const notification of notificationsToDelete) {
          await models.SCHEDULED_NOTIFICATIONS_USERS.destroy({
            where: { customerUserId: notification.dataValues.customerUserId },
          });
        }

        for (const newNotification of newNotifications) {
          const newNotificationData = await models.SCHEDULED_NOTIFICATIONS_USERS.create(newNotification);
          const newNotifications =
            await models.SCHEDULED_NOTIFICATIONS_USERS.findOne({
              where: {
                customerUserId: newNotificationData.dataValues.customerUserId,
              },
              include: [
                {
                  model: models.CUSTOMER_USER,
                  as: "customerUser",
                  attributes: ["name", "email"],
                },
              ],
            });
          if (!newNotifications) return;
          formatedNewNotifications.push(
            newNotifications.dataValues.customerUser
          );
        }
        return {
          formatedNotificationsToDelete,
          formatedNewNotifications,
          formatedNotificationsWithoutChanges,
        };
      } catch (error) {
        throw error;
      }
    } else {
      for (const newNotification of newScheludeNotificationsUsers) {
        await models.SCHEDULED_NOTIFICATIONS_USERS.create(newNotification);
      }
    }
  }
}

export default ScheduledNotificationsUsersService;
