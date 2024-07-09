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
const judicial_case_file_service_1 = __importDefault(require("../../app/judicial/services/judicial-case-file.service"));
const boom_1 = __importDefault(require("@hapi/boom"));
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
        const judicialCaseFiles = new judicial_case_file_service_1.default();
        for (const key in scheduledJobs) {
            scheduledJobs[key].stop();
        }
        scheduledJobs = {};
        const scheduledNotifications = yield scheduledNotificationsService.findAll();
        scheduledNotifications.forEach((schedule) => {
            const { id, hourTimeToNotify, customerHasBankId, frequencyToNotify, logicKey, state, scheduledNotificationsUsers, daysToNotify, } = schedule.dataValues;
            const now = new Date();
            const date = moment_1.default.utc(hourTimeToNotify, "YYYY-MM-DD HH:mm:ss");
            const minute = date.format("mm");
            const hour = date.format("HH");
            const currentDay = daysOfTheWeek[now.getDay()];
            const cronTime = `${minute} ${hour} * * *`;
            const parseDaysToNotify = JSON.parse(daysToNotify);
            scheduledJobs[id] = node_cron_1.default.schedule(cronTime, () => __awaiter(void 0, void 0, void 0, function* () {
                if (logicKey === "key-job-impulse-pending-processes" &&
                    state &&
                    parseDaysToNotify.includes(currentDay)) {
                    const fileCases = yield judicialCaseFiles.findAllActive(customerHasBankId);
                    if (!fileCases)
                        throw boom_1.default.notFound("No se encontraron expedientes");
                    fileCases.forEach((fileCase) => {
                        const hasBinacles = fileCase.dataValues.judicialBinnacle.length;
                        if (!hasBinacles)
                            return;
                        const lastBinnacle = fileCase.dataValues.judicialBinnacle[hasBinacles - 1];
                        const date = moment_1.default.utc(lastBinnacle.date);
                        const diffDays = moment_1.default.utc().diff(date, "days");
                        if (diffDays >= frequencyToNotify) {
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
                            const emailBody = `
                  <div class="cliente">
                      <h2>Cliente: ${fileCase.dataValues.client.name} (${fileCase.dataValues.customerHasBank.bank.name}) - (${fileCase.dataValues.client.city.name})</h2>
                      <p class="expediente"><strong>Exp.:</strong> ${fileCase.dataValues.numberCaseFile}</p>
                      <p class="especialista"><strong>Esp.:</strong> ${fileCase.dataValues.secretary} - ${fileCase.dataValues.judicialCourt.court}</p>
                      <p><strong>Escritos SIN PROVEÍDO a la fecha:</strong></p>
                      <ul class="detalles">
                          <li>${moment_1.default
                                .utc(lastBinnacle.date)
                                .format("DD-MM-YYYY")} - ${lastBinnacle.lastPerformed}</li>
                      </ul>
                  </div>
                `;
                            const message = {
                                from: config_1.default.AWS_EMAIL,
                                to: emails,
                                subject: "PROCESOS PENDIENTE DE IMPULSO",
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
                          <h1>Procesos Pendientes de Impulso</h1>
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
                    });
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
