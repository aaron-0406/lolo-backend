import { Request, Response, NextFunction } from "express";
import JudicialSubjectService from "../../app/judicial/services/judicial-subject.service";
const service = new JudicialSubjectService();

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
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
