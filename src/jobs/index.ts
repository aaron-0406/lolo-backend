import NotificationJudicialBinacleJobs from "./judicial/judicial-binacle.job";
import NotificationsJudicialFileCaseJobs from "./judicial/judicial-file-case.job";

const notificationJudicialBinacleJobs = new NotificationJudicialBinacleJobs();
const notificationJudicialFileCaseJobs = new NotificationsJudicialFileCaseJobs();

export const startCronJobs = () => {

 //Judicial File Case Jobs
  notificationJudicialFileCaseJobs.notificationSendEveryDayJob();
}