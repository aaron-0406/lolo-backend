import express from "express";
import DocumentSchema from "../app/customers/schemas/document.schema";
import validatorHandler from "../middlewares/validator.handler";
import { generateDocumentController } from "../controllers/document.controller";

const { createDocumentSchema } = DocumentSchema;
const router = express.Router();

router.post(
  "/",
  validatorHandler(createDocumentSchema, "body"),
  generateDocumentController
);

export default router;
