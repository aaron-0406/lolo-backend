"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const node_cron_1 = __importDefault(require("node-cron"));
const nodemailer = __importStar(require("nodemailer"));
const scheduled_notifications_service_1 = __importDefault(require("../../app/settings/services/scheduled-notifications.service"));
const config_1 = __importDefault(require("../../config/config"));
const judicial_binnacle_service_1 = __importDefault(require("../../app/judicial/services/judicial-binnacle.service"));
let scheduledJobs = {};
const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const updateCronJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scheduledNotificationsService = new scheduled_notifications_service_1.default();
        const judicialBinnacleService = new judicial_binnacle_service_1.default();
        for (const key in scheduledJobs) {
            scheduledJobs[key].stop();
        }
        scheduledJobs = {};
        const scheduledNotifications = yield scheduledNotificationsService.findAll();
        scheduledNotifications.forEach((schedule) => {
            const { id, hourTimeToNotify, customerHasBankId, frequencyToNotify, logicKey, state, scheduledNotificationsUsers, daysToNotify, } = schedule.dataValues;
            const now = new Date();
            const date = moment_1.default.utc(hourTimeToNotify, "YYYY-MM-DD HH:mm:ss", "America/Lima");
            const minute = date.format("mm");
            const hour = date.format("HH");
            const currentDay = daysOfTheWeek[now.getDay()];
            const cronTime = `${minute} ${hour} * * *`;
            const parseDaysToNotify = JSON.parse(daysToNotify);
            scheduledJobs[id] = node_cron_1.default.schedule(cronTime, () => __awaiter(void 0, void 0, void 0, function* () {
                if (logicKey === "key-job-impulse-pending-processes" &&
                    state &&
                    parseDaysToNotify.includes(currentDay)) {
                    const judicialBinnacles = yield judicialBinnacleService.findAllBinnaclesByCHBJob(customerHasBankId);
                    const filteredRta = judicialBinnacles.filter((judicialBinnacle) => {
                        const date = moment_1.default.utc(judicialBinnacle.date);
                        const diffDays = moment_1.default.utc().diff(date, "days");
                        return diffDays >= frequencyToNotify;
                    });
                    if (filteredRta.length) {
                        const transport = nodemailer.createTransport({
                            host: config_1.default.AWS_EMAIL_HOST,
                            port: 587,
                            secure: false,
                            auth: {
                                user: config_1.default.AWS_EMAIL_USER,
                                pass: config_1.default.AWS_EMAIL_PASSWORD,
                            },
                        });
                        const emails = scheduledNotificationsUsers.map((scheduleNotificationUser) => {
                            var _a, _b, _c, _d;
                            return ((_d = (_c = (_b = (_a = scheduleNotificationUser === null || scheduleNotificationUser === void 0 ? void 0 : scheduleNotificationUser.dataValues) === null || _a === void 0 ? void 0 : _a.customerUser) === null || _b === void 0 ? void 0 : _b.dataValues) === null || _c === void 0 ? void 0 : _c.email) !== null && _d !== void 0 ? _d : "");
                        });
                        const binnaclesByCity = filteredRta.reduce((acc, judicialBinnacle) => {
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
                                .map((judicialBinnacle) => {
                                return `
                  <div class="cliente">
                      <h2>Cliente: ${judicialBinnacle["judicialFileCase.client.name"]} (${judicialBinnacle["customerHasBank.bank.name"]}) - (${city.toUpperCase()})</h2>
                      <p class="expediente"><strong>Exp.:</strong> ${judicialBinnacle["judicialFileCase.numberCaseFile"]}</p>
                      <p class="especialista"><strong>Esp.:</strong> ${judicialBinnacle["judicialFileCase.secretary"]} - ${judicialBinnacle["judicialFileCase.judicialCourt.court"]}</p>
                      <p><strong>Escritos SIN PROVEÍDO a la fecha:</strong></p>
                      <ul class="detalles">
                          <li>${moment_1.default.utc(judicialBinnacle.date).format("DD-MM-YYYY")} - ${judicialBinnacle.lastPerformed}</li>
                      </ul>
                      <p>Procesos pendientes de impulso:</p>
                  </div>
                `;
                            })
                                .join("");
                            if (binnaclesByCity[city].length) {
                                const message = {
                                    from: config_1.default.AWS_EMAIL,
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
                                    if (error)
                                        console.log(error);
                                    if (info)
                                        console.log(info);
                                });
                            }
                        }
                    }
                    console.log("JOB FINISH");
                }
                else {
                    console.log("JOB DISABLED");
                }
            }), { timezone: "America/Lima" });
            scheduledJobs[id].start();
        });
    }
    catch (e) {
        console.log("ERROR JOBS: ", e);
    }
});
exports.default = updateCronJobs;
