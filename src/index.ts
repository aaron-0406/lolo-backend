import express from "express";
import cors, { CorsOptions } from "cors";
import routerApi from "./routes";
import errorHandlerr from "./middlewares/error.handler";

const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } =
  errorHandlerr;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//CORS
const whitelist = [
  "http://localhost:8080",
  "https://myapp.co",
  "http://localhost:3000",
  "http://192.168.1.56:3000",
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

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("My port: " + port);
});
