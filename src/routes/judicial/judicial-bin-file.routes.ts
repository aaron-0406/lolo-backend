import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialBinFileSchema from "../../app/judicial/schemas/judicial-bin-file.schema";
import { deleteJudicialBinFileController } from "../../controllers/judicial/judicial-bin-file.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { getJudicialBinFileByIDSchema } = judicialBinFileSchema;

const router = express.Router();

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinFileByIDSchema, "params"),
  deleteJudicialBinFileController
);

export default router;
