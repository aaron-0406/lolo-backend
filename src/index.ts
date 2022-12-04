import express from "express";
import cors, { CorsOptions } from "cors";
import routerApi from "./routes";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//CORS
const whitelist = ["http://localhost:8080", "https://myapp.co"];
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

app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola, soy una nueva ruta");
});

routerApi(app);

app.listen(port, () => {
  console.log("My port: " + port);
});
