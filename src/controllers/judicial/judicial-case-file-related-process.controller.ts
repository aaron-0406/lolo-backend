import { Request, Response, NextFunction } from "express";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialCaseFileModel from "../../db/models/judicial-case-file.model";
import JudicialCaseFileRelatedProcessService from "../../app/judicial/services/judicial-case-file-realated-process.service";

const service = new JudicialCaseFileRelatedProcessService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export const getJudicialCaseFileRelatedProcessbyCaseFileIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { caseFileId } = req.params;
    const caseFiles = await service.findAllRelatedProcessbyCaseFileId(
      caseFileId,
      req.query
    );
    res.json(caseFiles);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCaseFileRelatedProcessController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const caseFiles = await service.findAll();
    res.json(caseFiles);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCaseFileRelatedProcessByClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const caseFiles = await service.findAllByClient(clientId);
    res.json(caseFiles);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCaseFileRelatedProcessByCHBIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const caseFiles = await service.findAllByCHB(chb, req.query);
    res.json(caseFiles);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCaseFileRelatedProcessByNumberCaseFileController =
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { numberCaseFile, chb } = req.params;
      const caseFile = await service.findByNumberCaseFile(
        numberCaseFile,
        Number(chb)
      );
      res.json(caseFile);
    } catch (error) {
      next(error);
    }
  };

export const getJudicialCaseFileRelatedProcessRelatedController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { numberCaseFile, chb } = req.params;
    const caseFile = await service.findRelatedNumberCaseFile(
      numberCaseFile,
      Number(chb)
    );
    res.json(caseFile);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCaseFileRelatedProcessByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const caseFile = await service.findByID(id);
    res.json(caseFile);
  } catch (error) {
    next(error);
  }
};

export const createJudicialCaseFileRelatedProcessController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const body = req.body;
    const newJudicialCaseFile = await service.create(body, customerId);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-05-02",
      entity: JUDICIAL_CASE_FILE_TABLE,
      entityId: Number(newJudicialCaseFile.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newJudicialCaseFile);
  } catch (error) {
    next(error);
  }
};

export const createQrCodeRelatedProcessController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { numberCaseFile, chb } = req.params;
    const qrCode = await service.createQrCode(numberCaseFile, parseInt(chb));
    res.json(qrCode);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialCaseFileRelatedProcessController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const caseFile = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-05-03",
      entity: JUDICIAL_CASE_FILE_TABLE,
      entityId: Number(caseFile.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(caseFile);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialCaseFileRelatedProcessController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialCaseFile = await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-05-04",
      entity: JUDICIAL_CASE_FILE_TABLE,
      entityId: Number(judicialCaseFile.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
