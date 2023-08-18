import express, { Express } from "express";

import customerRouter from "./dash/customer.routes";
import bankRouter from "./dash/bank.routes";
import customerHasBankRouter from "./dash/customer-has-bank.routes";
import funcionarioRouter from "./dash/funcionario.routes";
import cityRouter from "./dash/city.routes";
import customerUserRouter from "./dash/customer-user.routes";
import userAppRouter from "./dash/user-app.routes";
import clientRouter from "./extrajudicial/client.routes";
import guarantorRouter from "./extrajudicial/guarantor.routes";
import directionRouter from "./extrajudicial/direction.routes";
import commentRouter from "./extrajudicial/comment.routes";
import fileRouter from "./extrajudicial/file.routes";
import authRouter from "./extrajudicial/auth.routes";
import authDashRouter from "./dash/auth.routes";
import negotiationRouter from "./dash/negotiation.routes";
import docRouter from "./extrajudicial/document.routes";
import templateHasValuesRouter from "./extrajudicial/template-has-values.routes";
import ecampoRouter from "./extrajudicial/ecampo.routes";
import templateRouter from "./extrajudicial/template.routes";
import valuesRouter from "./extrajudicial/values.routes";
import dashboardRouter from "./extrajudicial/dashboard.routes";
import productRouter from "./extrajudicial/product.routes";
import managementActionRouter from "./dash/management-action.routes";
import goalRouter from "./extrajudicial/goal.routes";
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
