import cron from "node-cron";
import ScheduledNotificationsService from "../../app/settings/services/scheduled-notifications.service";
import { ScheduledNotificationType } from "../../app/settings/types/scheduled-notifications.type";

const NOTIFICATION_SEND_EVERY_TWENTY_DAYS_BINACLE_JOB_NAME = "NotificationSendEveryTwentyDaysBinacleJob";

class NotificationJudicialBinacleJobs{
  private scheduledNotificationsService: ScheduledNotificationsService;
  private notifications: ScheduledNotificationType[] = [];
  constructor () {
    this.scheduledNotificationsService = new ScheduledNotificationsService();
  }

  async init () {
    const currentNotifications =
      await this.scheduledNotificationsService.findAll();
    this.notifications = currentNotifications.map(
      (notification) => notification.dataValues
    );

  }

  async notificationSendEveryTwentyDaysBinacleJob(){
    cron.schedule("0 8 */20 * *", async () => {
      this.init();
      console.log("Notification send every twenty days job");
    });
  }

  async notificationSendEveryMomentBinacleJob(){
    cron.schedule("* * * * *", async () => {
      this.init();
      console.log(this.notifications);
      console.log("Notification send every moment job");
    });
  }
}

export default NotificationJudicialBinacleJobs;