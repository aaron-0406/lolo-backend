import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialObsFileSchema from "../../app/judicial/schemas/judicial-obs-file.schema";
import {
  deleteJudicialObsFileController,
  findFileByIdController,
} from "../../controllers/judicial/judicial-obs-file.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { getJudicialObsFileByIDSchema, getFileSchema } = judicialObsFileSchema;

const router = express.Router();

router.get(
  "/single/:idCustomer/:code/:chb/:judicialFileCaseId/:id",
  JWTAuth,
  validatorHandler(getFileSchema, "params"),
  findFileByIdController
);

router.delete(
  "/:idCustomer/:chb/:code/:judicialFileCaseId/:id",
  JWTAuth,
  validatorHandler(getJudicialObsFileByIDSchema, "params"),
  deleteJudicialObsFileController
);

export default router;
