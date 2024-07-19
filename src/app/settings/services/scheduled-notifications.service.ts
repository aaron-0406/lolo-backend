import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduledNotificationType } from "../types/scheduled-notifications.type";
import updateCronJobs from "../../../jobs/judicial/judicial-scheduled-notifications.job";

const { models } = sequelize;
class ScheduledNotificationsService {
  constructor() {}

  async findAll() {
    const rta = await models.SCHEDULED_NOTIFICATIONS.findAll({
      include: [
        {
          model: models.SCHEDULED_NOTIFICATIONS_USERS,
          as: "scheduledNotificationsUsers",
          include: [
            {
              model: models.CUSTOMER_USER,
              as: "customerUser",
            },
          ],
        },
      ],
    });

    if (!rta) {
      throw boom.notFound("No existen notificaciones programadas");
    }

    return rta;
  }

  async findAllByChb(chb: string) {
    const rta = await models.SCHEDULED_NOTIFICATIONS.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!rta) {
      throw boom.notFound("No existen notificaciones programadas");
    }
    const formatData = rta.map((item) => {
      return({
        ...item.dataValues,
        daysToNotify: JSON.parse(item.dataValues.daysToNotify)
      })
    })

    return formatData;
  }

  async create(data: ScheduledNotificationType) {
    const newScheduledNotification =
      await models.SCHEDULED_NOTIFICATIONS.create(data);

    updateCronJobs();
    return {
      ...newScheduledNotification.dataValues,
      daysToNotify: JSON.parse(newScheduledNotification.dataValues.daysToNotify)
    }
  }

  async update(id: string, data: ScheduledNotificationType) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATIONS.findByPk(
      id
    );

    if (!scheduledNotification) {
      throw boom.notFound("Notificación programada no encontrada");
    }

    await scheduledNotification.update(data);

    updateCronJobs();
    return {
      ...scheduledNotification.dataValues,
      daysToNotify: JSON.parse(scheduledNotification.dataValues.daysToNotify)
    };
  }

  async delete(id: string) {
    const scheduledNotification = await models.SCHEDULED_NOTIFICATIONS.findByPk(
      id
    );

    if (!scheduledNotification) {
      throw boom.notFound("Notificación programada no encontrada");
    }

    await scheduledNotification.destroy();

    updateCronJobs();
    return scheduledNotification;
  }
}

export default ScheduledNotificationsService;
