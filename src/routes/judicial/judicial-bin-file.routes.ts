import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialBinFileSchema from "../../app/judicial/schemas/judicial-bin-file.schema";
import {
  deleteJudicialBinFileController,
  findFileByIdController,
} from "../../controllers/judicial/judicial-bin-file.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { getJudicialBinFileByIDSchema, getFileSchema } = judicialBinFileSchema;

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
  validatorHandler(getJudicialBinFileByIDSchema, "params"),
  deleteJudicialBinFileController
);

export default router;
