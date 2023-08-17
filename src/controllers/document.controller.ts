import { Request, Response, NextFunction } from "express";
import TemplateHasValuesService from "../app/extrajudicial/services/template-has-values.service";
import DocumentService from "../app/extrajudicial/services/document.service";
import ClientService from "../app/extrajudicial/services/client.service";
import { saveWordDocument } from "../libs/helpers";

const serviceTemplateHasValues = new TemplateHasValuesService();
const serviceClient = new ClientService();
const service = new DocumentService();

export const generateDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { templateHasValuesId, usersId },
    } = req;

    const templateHasValues =
      await serviceTemplateHasValues.findOneWidthTemplate(templateHasValuesId);
    const clients = await serviceClient.findAllBDetailsAndClientsId(usersId);
    const doc = await service.generateDocument(templateHasValues, clients);
    const docName = await saveWordDocument(doc, templateHasValues.name);
    res.json({ docName });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
