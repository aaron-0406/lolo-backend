import express, { Express } from "express";

import customerRouter from "./customer.routes";
import bankRouter from "./bank.routes";
import customerHasBankRouter from "./customer-has-bank.routes";
import funcionarioRouter from "./funcionario.routes";
import cityRouter from "./city.routes";
import customerUserRouter from "./customer-user.routes";
import clientRouter from "./client.routes";

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/customer", customerRouter);
  router.use("/bank", bankRouter);
  router.use("/customer-bank", customerHasBankRouter);
  router.use("/funcionario", funcionarioRouter);
  router.use("/city", cityRouter);
  router.use("customer-user", customerUserRouter);
  router.use("/client", clientRouter);
};

export default routerApi;
