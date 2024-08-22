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
import judicialCaseFileRelatedProcessRouter from "./judicial/judicial-case-file-related-process.routes";
import judicialCourtRouter from "./judicial/judicial-court.routes";
import judicialProceduralWayRouter from "./judicial/judicial-procedural-way.routes";
import judicialSubjectRouter from "./judicial/judicial-subject.routes";
import judicialProcessReasonRouter from "./judicial/judicial-process-reason.routes";
import judicialObservationRouter from "./judicial/Judicial-observation.routes";
import judicialObsRouter from "./judicial/judicial-obs-file.routes";
import judicialObsTypeRouter from "./judicial/judicial-obs-type.routes";
import judicialSedeRouter from "./judicial/judicial-sede.routes";
import judicialBinTypeBinnacleRouter from "./judicial/judicial-bin-type-binnacle.routes";
import judicialBinProceduralStageRouter from "./judicial/judicial-bin-procedural-stage.routes";
import judicialBinnacleRouter from "./judicial/judicial-binnacle.routes";
import judicialBinFileRouter from "./judicial/judicial-bin-file.routes";
import judicialCollateralRouter from "./judicial/judicial-collateral.routes";
import judicialNotaryRouter from "./judicial/judicial-notary.routes";
import judicialRegisterOfficeRouter from "./judicial/judicial-register-office.routes";
import judicialRegistrationAreaRouter from "./judicial/judicial-registration-area.routes";
import judicialUseOfPropertyRouter from "./judicial/judicial-use-of-property.routes";
import judicialCaseFileHasCollateralRouter from "./judicial/judicial-case-file-has-collateral.routes";
import judicialCollateralChargesEncumbrancesRouter from "./judicial/judicial-collateral-charges-encumbrances.routes";
import judicialCollateralChargesEncumbrancesTypeLoadRouter from "./judicial/judicial-collateral-charges-encumbrances-type-load.routes";
import judicialCollateralFilesRouter from "./judicial/judicial-collateral-files.routes";
import managementActionRouter from "./dash/management-action.routes";
import goalRouter from "./extrajudicial/goal.routes";
import roleRouter from "./dash/role.routes";
import permissionRouter from "./dash/permission.routes";
import userLogRouter from "./dash/user-log.routes";
import extContactRouter from "./extrajudicial/ext-contact.routes";
import extIpAddressBank from "./extrajudicial/ext-ip-address-bank.routes";
import extTagGroupRouter from "./extrajudicial/ext-tag-group.routes";
import extTagRouter from "./extrajudicial/ext-tag.routes";
import extAddresType from "./extrajudicial/ext-address-type.routes";
import extContactTypeRouter from "./extrajudicial/ext-contact-type.routes";
import extProductNameRouter from "./extrajudicial/ext-product-name.routes";
import schedudedNotificationRouter from "./config/scheduled-notifications.routes";
import schedudedNotificationsUsersRouter from "./config/scheduled-notifications-users.routes";
import compareExcelsRouter from "./config/compare-excels.routes";
import departmentRouter from "./config/department.routes";
import districtRouter from "./config/districts.routes";
import provinceRouter from "./config/province.routes";
import judicialCollateralAuctionRoundRouter from "./judicial/judicial-collateral-auction-round.routes";
import tariffRouter from "./config/tariff.routes";
import judicialBinNotificationRouter from "./judicial/judicial-bin-notification.routes";

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
  router.use("/cobranza/ext-ip-address-bank", extIpAddressBank);
  router.use("/cobranza/ext-tag-group", extTagGroupRouter);
  router.use("/cobranza/ext-tag", extTagRouter);
  router.use("/cobranza/ext-address-type", extAddresType);
  router.use("/cobranza/ext-contact-type", extContactTypeRouter);
  router.use("/cobranza/ext-product-name", extProductNameRouter);

  router.use("/judicial/case-file", judicialCaseFileRouter);
  router.use("/judicial/related-process", judicialCaseFileRelatedProcessRouter);
  router.use("/judicial/court", judicialCourtRouter);
  router.use("/judicial/procedural-way", judicialProceduralWayRouter);
  router.use("/judicial/subject", judicialSubjectRouter);
  router.use("/judicial/process-reason", judicialProcessReasonRouter);
  router.use("/judicial/obs-type", judicialObsTypeRouter);
  router.use("/judicial/observation", judicialObservationRouter);
  router.use("/judicial/obs-file", judicialObsRouter);
  router.use("/judicial/sede", judicialSedeRouter);

  router.use("/judicial/bin-type-binnacle", judicialBinTypeBinnacleRouter);
  router.use("/judicial/bin-notification", judicialBinNotificationRouter);
  router.use("/judicial/binnacle", judicialBinnacleRouter);
  router.use("/judicial/bin-file", judicialBinFileRouter);
  router.use(
    "/judicial/bin-procedural-stage",
    judicialBinProceduralStageRouter
  );
  router.use("/judicial/collateral", judicialCollateralRouter);
  router.use("/judicial/case-file-has-collateral", judicialCaseFileHasCollateralRouter);
  router.use("/judicial/notary", judicialNotaryRouter);
  router.use("/judicial/register-office", judicialRegisterOfficeRouter);
  router.use("/judicial/registration-area", judicialRegistrationAreaRouter);
  router.use("/judicial/use-of-property", judicialUseOfPropertyRouter);
  router.use("/judicial/collateral-charges-encumbrances", judicialCollateralChargesEncumbrancesRouter);
  router.use("/judicial/collateral-charges-encumbrances-type-load", judicialCollateralChargesEncumbrancesTypeLoadRouter);
  router.use("/judicial/collateral-files", judicialCollateralFilesRouter);
  router.use("/judicial/collateral-auction-round", judicialCollateralAuctionRoundRouter);

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

  router.use("/config/scheduled-notifications", schedudedNotificationRouter);
  router.use(
    "/config/scheduled-notifications-users",
    schedudedNotificationsUsersRouter
  )
  router.use(
    "/config/compare-excels",
    compareExcelsRouter
  )
  router.use("/config/departments", departmentRouter)
  router.use("/config/districts", districtRouter)
  router.use("/config/provinces", provinceRouter)
  router.use("/config/tariff", tariffRouter)
};

export default routerApi;
