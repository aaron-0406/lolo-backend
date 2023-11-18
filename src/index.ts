import express from "express";
import cors, { CorsOptions } from "cors";
import routerApi from "./routes";
import errorHandlerr from "./middlewares/error.handler";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import "./libs/passport";
import ipHandler from "./middlewares/ip.handler";
import {
  deleteDownloadFolderTask,
  sendWeeklyReportsByEmail,
} from "./libs/cron_jobs";

const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } =
  errorHandlerr;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: number;
      name: string;
      lastName: string;
      phone: string;
      dni: string;
      email: string;
      privilege: string;
      state: boolean;
      createdAt: Date;
      customerId: number;
      roleId: number;
      permissions: Array<String>;
    }

    interface Request {
      clientIp?: string;
    }
  }
}

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//CORS
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://192.168.1.24:3000",
  "http://192.168.0.10:3000",
  "https://lolobank.com",
  "http://lolobank.com",
];
const options: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin ?? "") || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/build")));
app.use(ipHandler);

routerApi(app);

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/build", "index.html"));
});

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  fs.mkdir(path.join(__dirname, "./public/download"), () => {});
  deleteDownloadFolderTask();
  sendWeeklyReportsByEmail();
  console.log("My port: " + port);
});
