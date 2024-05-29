import updateCronJobs from "./judicial/judicial-scheduled-notifications.job";

export const startJudicialCronJobs = () => {
  updateCronJobs();
};
