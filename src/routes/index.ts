import express, { Express } from "express";

import customerRouter from "./customer.routes";
import bankRouter from "./bank.routes";
import customerHasBankRouter from "./customer-has-bank.routes";
import funcionarioRouter from "./funcionario.routes";
import cityRouter from "./city.routes";
import customerUserRouter from "./customer-user.routes";
import clientRouter from "./client.routes";
import guarantorRouter from "./guarantor.routes";
import directionRouter from "./direction.routes";
import commentRouter from "./comment.routes";
import fileRouter from "./file.routes";
import authRouter from "./auth.routes";
import negotiationRouter from "./negotiation.routes";
import docRouter from "./document.routes";
import templateHasValuesRouter from "./template-has-values.routes";
import ecampoRouter from "./ecampo.routes";
import templateRouter from "./template.routes";
import valuesRouter from "./values.routes";

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/customer", customerRouter);
  router.use("/bank", bankRouter);
  router.use("/customer-bank", customerHasBankRouter);
  router.use("/funcionario", funcionarioRouter);
  router.use("/city", cityRouter);
  router.use("/customer-user", customerUserRouter);
  router.use("/client", clientRouter);
  router.use("/guarantor", guarantorRouter);
  router.use("/direction", directionRouter);
  router.use("/comment", commentRouter);
  router.use("/file", fileRouter);
  router.use("/auth", authRouter);
  router.use("/negotiation", negotiationRouter);
  router.use("/doc", docRouter);
  router.use("/template-has-values", templateHasValuesRouter);
  router.use("/ecampo", ecampoRouter);
  router.use("/template", templateRouter);
  router.use("/values", valuesRouter);
};

export default routerApi;
