import express from "express";
import DocumentSchema from "../../app/extrajudicial/schemas/document.schema";
import validatorHandler from "../../middlewares/validator.handler";
import { generateDocumentController } from "../../controllers/extrajudicial/document.controller";

const { createDocumentSchema } = DocumentSchema;
const router = express.Router();
import { JWTAuth } from "../../middlewares/auth.handler";

router.post(
  "/",
  JWTAuth,
  validatorHandler(createDocumentSchema, "body"),
  generateDocumentController
);

export default router;
