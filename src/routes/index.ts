import express, { Express } from "express";

import customerRouter from "./dash/customer.routes";
import bankRouter from "./dash/bank.routes";
import customerHasBankRouter from "./dash/customer-has-bank.routes";
import funcionarioRouter from "./dash/funcionario.routes";
import cityRouter from "./dash/city.routes";
import customerUserRouter from "./dash/customer-user.routes";
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
import judicialCaseFileRouter from "./judicial/judicial-case-file.routes";
import judicialCourtRouter from "./judicial/judicial-court.routes";
import judicialProceduralWayRouter from "./judicial/judicial-procedural-way.routes";
import judicialSubjectRouter from "./judicial/judicial-subject.routes";
import managementActionRouter from "./dash/management-action.routes";
import goalRouter from "./extrajudicial/goal.routes";
import roleRouter from "./dash/role.routes";
import permissionRouter from "./dash/permission.routes";
import userLogRouter from "./dash/user-log.routes";
import extContactRouter from "./extrajudicial/ext-contact.routes";
import extTagGroupRouter from "./extrajudicial/ext-tag-group.routes";
import extTagRouter from "./extrajudicial/ext-tag.routes";

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/cobranza/client", clientRouter);
  router.use("/cobranza/guarantor", guarantorRouter);
  router.use("/cobranza/direction", directionRouter);
  router.use("/cobranza/comment", commentRouter);
  router.use("/cobranza/file", fileRouter);
  router.use("/cobranza/auth", authRouter);
  router.use("/cobranza/doc", docRouter);
  router.use("/cobranza/template-has-values", templateHasValuesRouter);
  router.use("/cobranza/ecampo", ecampoRouter);
  router.use("/cobranza/template", templateRouter);
  router.use("/cobranza/values", valuesRouter);
  router.use("/cobranza/dashboard", dashboardRouter);
  router.use("/cobranza/product", productRouter);
  router.use("/cobranza/goal", goalRouter);
  router.use("/cobranza/contact", extContactRouter);
  router.use("/cobranza/ext-tag-group", extTagGroupRouter);
  router.use("/cobranza/ext-tag", extTagRouter);

  router.use("/judicial/case-file", judicialCaseFileRouter);
  router.use("/judicial/court", judicialCourtRouter);
  router.use("/judicial/procedural-way", judicialProceduralWayRouter);
  router.use("/judicial/subject", judicialSubjectRouter);

  router.use("/dash/auth", authDashRouter);
  router.use("/dash/role", roleRouter);
  router.use("/dash/permission", permissionRouter);
  router.use("/dash/management-action", managementActionRouter);
  router.use("/dash/negotiation", negotiationRouter);
  router.use("/dash/funcionario", funcionarioRouter);
  router.use("/dash/customer", customerRouter);
  router.use("/dash/customer-user", customerUserRouter);
  router.use("/dash/customer-bank", customerHasBankRouter);
  router.use("/dash/bank", bankRouter);
  router.use("/dash/city", cityRouter);
  router.use("/dash/user-log", userLogRouter);
};

export default routerApi;
