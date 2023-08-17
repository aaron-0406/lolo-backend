import express, { Express } from "express";

import customerRouter from "./dash/customer.routes";
import bankRouter from "./dash/bank.routes";
import customerHasBankRouter from "./dash/customer-has-bank.routes";
import funcionarioRouter from "./dash/funcionario.routes";
import cityRouter from "./dash/city.routes";
import customerUserRouter from "./dash/customer-user.routes";
import userAppRouter from "./dash/user-app.routes";
import clientRouter from "./client.routes";
import guarantorRouter from "./guarantor.routes";
import directionRouter from "./direction.routes";
import commentRouter from "./comment.routes";
import fileRouter from "./file.routes";
import authRouter from "./auth.routes";
import authDashRouter from "./dash/auth.routes";
import negotiationRouter from "./dash/negotiation.routes";
import docRouter from "./document.routes";
import templateHasValuesRouter from "./template-has-values.routes";
import ecampoRouter from "./ecampo.routes";
import templateRouter from "./template.routes";
import valuesRouter from "./values.routes";
import dashboardRouter from "./dashboard.routes";
import productRouter from "./product.routes";
import managementActionRouter from "./dash/management-action.routes";
import goalRouter from "./goal.routes";
import roleRouter from "./dash/role.routes";
import permissionRouter from "./dash/permission.routes";

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/client", clientRouter);
  router.use("/guarantor", guarantorRouter);
  router.use("/direction", directionRouter);
  router.use("/comment", commentRouter);
  router.use("/file", fileRouter);
  router.use("/auth", authRouter);
  router.use("/doc", docRouter);
  router.use("/template-has-values", templateHasValuesRouter);
  router.use("/ecampo", ecampoRouter);
  router.use("/template", templateRouter);
  router.use("/values", valuesRouter);
  router.use("/dashboard", dashboardRouter);
  router.use("/product", productRouter);
  router.use("/goal", goalRouter);

  router.use("/dash/auth", authDashRouter);
  router.use("/dash/role", roleRouter);
  router.use("/dash/permission", permissionRouter);
  router.use("/management-action", managementActionRouter);
  router.use("/negotiation", negotiationRouter);
  router.use("/funcionario", funcionarioRouter);
  router.use("/customer", customerRouter);
  router.use("/customer-user", customerUserRouter);
  router.use("/customer-bank", customerHasBankRouter);
  router.use("/bank", bankRouter);
  router.use("/city", cityRouter);
};

export default routerApi;
