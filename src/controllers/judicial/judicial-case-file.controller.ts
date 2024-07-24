import { Request, Response, NextFunction } from "express";
import UserLogService from "../../app/dash/services/user-log.service";
import JudicialCaseFileService from "../../app/judicial/services/judicial-case-file.service";
import judicialCaseFileModel from "../../db/models/judicial-case-file.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new JudicialCaseFileService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export const getJudicialCaseFileController = async (
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

export const getJudicialCaseFileByClientIdController = async (
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

export const getJudicialCaseFileByCHBIdController = async (
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

export const getJudicialCaseFileByNumberCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const getJudicialCaseFileRelatedController = async (
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

export const getJudicialCaseFileByIdController = async (
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

export const createJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const body = req.body;
    const newJudicialCaseFile = await service.create(body, customerId);

    const sumary = generateLogSummary({
      method: req.method,
      newData: newJudicialCaseFile.dataValues,
      id: newJudicialCaseFile.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-02",
      entity: JUDICIAL_CASE_FILE_TABLE,
      entityId: Number(newJudicialCaseFile.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json(newJudicialCaseFile);
  } catch (error) {
    next(error);
  }
};

export const createQrCodeToCaseFileController = async (
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

export const updateJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldJudicialCaseFile, newJudicialCaseFile } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldJudicialCaseFile,
      newData: newJudicialCaseFile.dataValues,
      id: newJudicialCaseFile.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-03",
      entity: JUDICIAL_CASE_FILE_TABLE,
      entityId: Number(newJudicialCaseFile.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newJudicialCaseFile);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialCaseProcessStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldJudicialCaseFile, newJudicialCaseFile } = await service.updateProcessStatus(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldJudicialCaseFile,
      newData: newJudicialCaseFile.dataValues,
      id: newJudicialCaseFile.dataValues.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-04-01",
      entity: JUDICIAL_CASE_FILE_TABLE,
      entityId: Number(newJudicialCaseFile.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newJudicialCaseFile.dataValues.id);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialCaseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldJudicialCaseFile = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldJudicialCaseFile,
      id: oldJudicialCaseFile.id,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-04",
      entity: JUDICIAL_CASE_FILE_TABLE,
      entityId: Number(oldJudicialCaseFile.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
