import moment from "moment";
import cron from "node-cron";
import * as nodemailer from "nodemailer";
import ScheduledNotificationsService from "../../app/settings/services/scheduled-notifications.service";
import config from "../../config/config";
import JudicialBinnacleService from "../../app/judicial/services/judicial-binnacle.service";

let scheduledJobs: { [key: number]: cron.ScheduledTask } = {};
const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const updateCronJobs = async () => {
  try {
    const scheduledNotificationsService = new ScheduledNotificationsService();
    const judicialBinnacleService = new JudicialBinnacleService();

    for (const key in scheduledJobs) {
      scheduledJobs[key].stop();
    }

    scheduledJobs = {};

    const scheduledNotifications =
      await scheduledNotificationsService.findAll();

    scheduledNotifications.forEach((schedule) => {
      const {
        id,
        hourTimeToNotify,
        customerHasBankId,
        frequencyToNotify,
        logicKey,
        state,
        scheduledNotificationsUsers,
        daysToNotify,
      } = schedule.dataValues;

      const now = new Date();
      const date = moment.utc(hourTimeToNotify, "YYYY-MM-DD HH:mm:ss", "America/Lima");
      const minute = date.format("mm");
      const hour = date.format("HH");
      const currentDay = daysOfTheWeek[now.getDay()];

      const cronTime = `${minute} ${hour} * * *`;
      const parseDaysToNotify = JSON.parse(daysToNotify);

      scheduledJobs[id] = cron.schedule(
        cronTime,
        async () => {
          if (
            logicKey === "key-job-impulse-pending-processes" &&
            state &&
            parseDaysToNotify.includes(currentDay)
          ) {
            const judicialBinnacles =
              await judicialBinnacleService.findAllBinnaclesByCHBJob(
                customerHasBankId
              );

            const filteredRta = judicialBinnacles.filter(
              (judicialBinnacle: any) => {
                const date = moment.utc(judicialBinnacle.date);
                const diffDays = moment.utc().diff(date, "days");
                return diffDays >= frequencyToNotify;
              }
            );
            if (filteredRta.length) {
              const transport = nodemailer.createTransport({
                host: config.AWS_EMAIL_HOST,
                port: 587,
                secure: false,
                auth: {
                  user: config.AWS_EMAIL_USER,
                  pass: config.AWS_EMAIL_PASSWORD,
                },
              });

              const emails = scheduledNotificationsUsers.map(
                (scheduleNotificationUser: any) => {
                  return (
                    scheduleNotificationUser?.dataValues?.customerUser
                      ?.dataValues?.email ?? ""
                  );
                }
              );

              const binnaclesByCity = filteredRta.reduce((acc: any, judicialBinnacle: any) => {
                const city = judicialBinnacle["judicialFileCase.client.city.name"];
                if (!acc[city]) {
                  acc[city] = [];
                }
                if (judicialBinnacle["judicialFileCase.processStatus"] === "Activo") {
                  acc[city].push(judicialBinnacle);
                }
                return acc;
              }, {});



              for (const city in binnaclesByCity) {
                const emailBody = binnaclesByCity[city]
                .map((judicialBinnacle: any) => {
                  return `
                  <div class="cliente">
                      <h2>Cliente: ${judicialBinnacle["judicialFileCase.client.name"]} (${judicialBinnacle["customerHasBank.bank.name"]}) - (${city.toUpperCase()})</h2>
                      <p class="expediente"><strong>Exp.:</strong> ${judicialBinnacle["judicialFileCase.numberCaseFile"]}</p>
                      <p class="especialista"><strong>Esp.:</strong> ${judicialBinnacle["judicialFileCase.secretary"]} - ${judicialBinnacle["judicialFileCase.judicialCourt.court"]}</p>
                      <p><strong>Escritos SIN PROVEÍDO a la fecha:</strong></p>
                      <ul class="detalles">
                          <li>${moment.utc(judicialBinnacle.date).format("DD-MM-YYYY")} - ${judicialBinnacle.lastPerformed}</li>
                      </ul>
                      <p>Procesos pendientes de impulso:</p>
                  </div>
                `;
                })
                .join("");

              if(binnaclesByCity[city].length) {
                const message = {
                  from: "pq53susrn6t7mscg@ethereal.email",
                  to: emails,
                  subject: `PROCESOS PENDIENTE DE IMPULSO - ${city.toUpperCase()}`,
                  html: `
                      <!DOCTYPE html>
                      <html lang="es">
                      <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Procesos Pendientes</title>
                          <style>
                              body {
                                  font-family: Arial, sans-serif;
                                  margin: 20px;
                              }
                              h1 {
                                  text-align: center;
                              }
                              .cliente {
                                  margin-bottom: 20px;
                              }
                              .cliente h2 {
                                  color: #2E86C1;
                              }
                              .cliente p {
                                  margin: 5px 0;
                              }
                              .expediente, .especialista, .detalles {
                                  margin-left: 20px;
                              }
                              .detalles {
                                  list-style-type: disc;
                              }
                          </style>
                      </head>
                      <body>
                        <h1>Procesos Pendientes de Impulso - ${city.toUpperCase()}</h1>
                        <h2>Cantidad de casos: ${binnaclesByCity[city].length}</h2>
                        ${emailBody}
                        <p>Saludos.</p>
                      </body>
                      </html>
                      `,
                };

                transport.sendMail(message, (error, info) => {
                  //TODO: We need to record this info in a table to show to the user if the email was send or no.
                  if (error) console.log(error);
                  if (info) console.log(info);
                });
              }
            }}

            console.log("JOB FINISH");
          } else {
            console.log("JOB DISABLED");
          }
        },
        { timezone: "America/Lima" }
      );

      scheduledJobs[id].start();
    });
  } catch (e) {
    console.log("ERROR JOBS: ", e);
  }
};

export default updateCronJobs;
