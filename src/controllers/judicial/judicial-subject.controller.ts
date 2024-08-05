import { Request, Response, NextFunction } from "express";
import JudicialSubjectService from "../../app/judicial/services/judicial-subject.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialSubjectModel from "../../db/models/judicial-subject.model";

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

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P27-01",
        entity: JUDICIAL_SUBJECT_TABLE,
        entityId: Number(newJudicialSubject.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

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
    const judicialSubject = await service.update(id, body);

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P27-02",
        entity: JUDICIAL_SUBJECT_TABLE,
        entityId: Number(judicialSubject.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(judicialSubject);
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
    await service.delete(id);

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P27-03",
        entity: JUDICIAL_SUBJECT_TABLE,
        entityId: Number(id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
