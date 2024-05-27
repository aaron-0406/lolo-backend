import cron from "node-cron";
import ScheduledNotificationsService from "../../app/settings/services/scheduled-notifications.service";
import JudicialCaseFileService from "../../app/judicial/services/judicial-case-file.service";
import JudicialBinnacleService from "../../app/judicial/services/judicial-binnacle.service";
import CustomerUserService from "../../app/dash/services/customer-user.service";
import { ScheduledNotificationType } from "../../app/settings/types/scheduled-notifications.type";
import { JudicialCaseFileType } from "../../app/judicial/types/judicial-case-file.type";
import { JudicialBinnacleType } from "../../app/judicial/types/judicial-binnacle.type";
import nodemailer from "nodemailer";
import { CustomerUserType } from "../../app/dash/types/customer-user.type";

// KEYS
const NOTIFICATION_SEND_EVERY_TWENTY_DAYS_FILE_CASE_JOB_KEY = "NotificationSendEveryDaysCaseFileJobKey";

class NotificationsJudicialFileCaseJobs {
  private isInitialized = false;
  private scheduledNotificationsService: ScheduledNotificationsService;
  private judicialCaseFileService: JudicialCaseFileService;
  private judicialBinnacleService: JudicialBinnacleService;
  private customerUserService!: CustomerUserService;
  private notifications: ScheduledNotificationType[] = [];
  private judicialCaseFiles: JudicialCaseFileType[] = [];
  private judicialBinnacles: JudicialBinnacleType[] = [];
  private customerUsers: CustomerUserType[] = [];
  private transporter!: nodemailer.Transporter;

  constructor() {
    this.scheduledNotificationsService = new ScheduledNotificationsService();
    this.judicialCaseFileService = new JudicialCaseFileService();
    this.judicialBinnacleService = new JudicialBinnacleService();
    this.customerUserService = new CustomerUserService();
  }

  async init() {
    if (this.isInitialized) return;
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "ggi3hsofnznjbcfj@ethereal.email",
        pass: "aSkPaxJvqG3S6dMpHn"
      }
    })
    const [currentNotifications, currentJudicialCaseFiles, currentBinacles, currentCustomerUsers] = await Promise.all([
      this.scheduledNotificationsService.findAll(),
      this.judicialCaseFileService.findAll(),
      this.judicialBinnacleService.findAll(),
      this.customerUserService.findAll()
    ]);

    this.notifications = currentNotifications.map(notification => notification.dataValues);
    this.judicialCaseFiles = currentJudicialCaseFiles.map(judicialCaseFile => judicialCaseFile.dataValues);
    this.judicialBinnacles = currentBinacles.map(judicialBinnacle => judicialBinnacle.dataValues);
    this.customerUsers = currentCustomerUsers.map(customerUser => customerUser.dataValues);
    this.isInitialized = true;
  }

  async notificationSendEveryDayJob() {


    const notifications = this.notifications.filter(
      notification =>
        notification.logicKey === NOTIFICATION_SEND_EVERY_TWENTY_DAYS_FILE_CASE_JOB_KEY &&
      notification.state
    );

    notifications.forEach(notification => {
      cron.schedule("0 8 * * *", async () => {
        await this.init();
        const currentDate = new Date();
        const judicialCaseFilesFiltered = this.judicialCaseFiles.filter(
          (judicialCaseFile) =>
            judicialCaseFile.customerHasBankId ===
            notification.customerHasBankId
        );

        if (judicialCaseFilesFiltered.length) {
          judicialCaseFilesFiltered.forEach(async (judicialCaseFile) => {
            const currentCustomerUser = this.customerUsers.find(
              (customerUser) =>
                customerUser.id === judicialCaseFile.customerUserId
            );

            const currentBinacles = this.judicialBinnacles.filter(
              (binacle) => binacle.judicialFileCaseId === judicialCaseFile.id
            );

            currentBinacles.forEach(async (binacle) => {
              const binacleDate = new Date(binacle.date);
              const diffTime = Math.abs(
                currentDate.getTime() - binacleDate.getTime()
              );
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays >= 20) {
                const info = await this.transporter.sendMail({
                  from: "ggi3hsofnznjbcfj@ethereal.email",
                  to: `${currentCustomerUser?.email}`,
                  subject: "Judicial File Case Notification",
                  text: "HELLO WORLD! TESTING",
                });
                console.log(info);
                const previewUrl = nodemailer.getTestMessageUrl(info);
                console.log(previewUrl);
              }
            });
          });
        }
      }).stop();
    });
  }
}

export default NotificationsJudicialFileCaseJobs;
