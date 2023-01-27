import express from "express";
import { Packer } from "docx";
import fs from "fs";
import path from "path";
import TemplateHasValuesService from "../app/customers/services/template-has-values.service";
import DocumentService from "../app/customers/services/document.service";
import DocumentSchema from "../app/customers/schemas/document.schema";
import ClientService from "../app/extrajudicial/services/client.service";
import validatorHandler from "../middlewares/validator.handler";

const { createDocumentSchema } = DocumentSchema;
const router = express.Router();
const serviceTemplate = new TemplateHasValuesService();
const serviceClient = new ClientService();
const service = new DocumentService();

router.post(
  "/",
  validatorHandler(createDocumentSchema, "body"),
  async (req, res, next) => {
    try {
      const {
        body: { templateHasValuesId, usersId },
      } = req;

      const templateHasValues = await serviceTemplate.findOneWidthTemplate(
        templateHasValuesId
      );
      const clients = await serviceClient.findAllBDetailsAndClientsId(usersId);
      const doc = await service.generateDocument(templateHasValues, clients);
      const docName = `${new Date().getTime()} - ${
        templateHasValues.name
      }.docx`;
      const buffer = await Packer.toBuffer(doc);
      fs.writeFileSync(
        path.join(__dirname, "../public/download", docName),
        buffer
      );
      res.json({ docName });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default router;
