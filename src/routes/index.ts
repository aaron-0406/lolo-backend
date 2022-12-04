import express, { Express } from "express";

import customersRouter from "./customers.routes";

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/customers", customersRouter);
};

export default routerApi;
