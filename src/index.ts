import express from "express";
import cors, { CorsOptions } from "cors";
import routerApi from "./routes";
import errorHandlerr from "./middlewares/error.handler";
import morgan from 'morgan';
import path from "path";

const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } =
  errorHandlerr;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
<<<<<<< HEAD
app.use(morgan('dev'));
=======
app.use(express.urlencoded({ extended: false }));
>>>>>>> 4bc8f5bb4473fc11d125a733d5d36268a2e325fd

//CORS
const whitelist = [
  "http://localhost:8080",
  "https://myapp.co",
  "http://localhost:3000",
  "http://192.168.1.56:3000",
  "http://192.168.152.24:5000",
  "http://192.168.152.24:3000",
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

routerApi(app);

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/build", "index.html"));
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("My port: " + port);
});
