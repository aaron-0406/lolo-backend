"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startJudicialCronJobs = void 0;
const judicial_scheduled_notifications_job_1 = __importDefault(require("./judicial/judicial-scheduled-notifications.job"));
const startJudicialCronJobs = () => {
    (0, judicial_scheduled_notifications_job_1.default)();
};
exports.startJudicialCronJobs = startJudicialCronJobs;
