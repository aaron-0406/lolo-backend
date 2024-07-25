import { Request, Response, NextFunction } from "express";
import JudicialSubjectService from "../../app/judicial/services/judicial-subject.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialSubjectModel from "../../db/models/judicial-subject.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new JudicialSubjectService();
const serviceUserLog = new UserLogService();
const { JUDICIAL_SUBJECT_TABLE } = judicialSubjectModel;

export const getJudicialSubjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialSubjects = await service.findAll();
    res.json(judicialSubjects);
  } catch (error) {
    next(error);
  }
};

export const getJudicialSubjectByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialSubjects = await service.findAllByCHB(Number(chb));
    res.json(judicialSubjects);
  } catch (error) {
    next(error);
  }
};

export const getJudicialSubjectByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialSubject = await service.findByID(id);
    res.json(judicialSubject);
  } catch (error) {
    next(error);
  }
};

export const createJudicialSubjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialSubject = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialSubject.dataValues.id,
      newData: newJudicialSubject.dataValues,
    });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P21-01",
        entity: JUDICIAL_SUBJECT_TABLE,
        entityId: Number(newJudicialSubject.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });

    res.status(201).json(newJudicialSubject);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialSubjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldJudicialSubject, newJudicialSubject } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialSubject.dataValues.id,
      oldData: oldJudicialSubject,
      newData: newJudicialSubject.dataValues,
    });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P21-02",
        entity: JUDICIAL_SUBJECT_TABLE,
        entityId: Number(newJudicialSubject.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });

    res.json(newJudicialSubject);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialSubjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldJudicialSubject = await service.delete(id);
    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldJudicialSubject,
    });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P21-03",
        entity: JUDICIAL_SUBJECT_TABLE,
        entityId: Number(id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
