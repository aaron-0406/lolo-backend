import { Request, Response, NextFunction } from "express";
import TemplateHasValuesService from "../../app/extrajudicial/services/template-has-values.service";
import DocumentService from "../../app/extrajudicial/services/document.service";
import ClientService from "../../app/extrajudicial/services/client.service";
import { saveWordDocument } from "../../libs/helpers";
import UserLogService from "../../app/dash/services/user-log.service";
import templateHasValuesModel from "../../db/models/many-to-many/template-has-values.model";

const serviceTemplateHasValues = new TemplateHasValuesService();
const serviceClient = new ClientService();
const service = new DocumentService();
const serviceUserLog = new UserLogService();

const { TEMPLATE_HAS_VALUES_TABLE } = templateHasValuesModel;

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P03-05",
      entity: TEMPLATE_HAS_VALUES_TABLE,
      entityId: Number(templateHasValuesId),
      ip: req.ip,
      customerId: Number(req.user?.customerId),
    });

    res.json({ docName });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
