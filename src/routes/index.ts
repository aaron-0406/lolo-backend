import express, { Express } from "express";

import customerRouter from "./customer.routes";
import bankRouter from "./bank.routes";
import customerHasBankRouter from "./customer-has-bank.routes";

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/customer", customerRouter);
  router.use("/bank", bankRouter);
  router.use("/customer-bank", customerHasBankRouter);
};

export default routerApi;
