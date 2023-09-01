import { Request, Response, NextFunction } from "express";
import JudicialProceduralWayService from "../../app/judicial/services/judicial-procedural-way.service";
const service = new JudicialProceduralWayService();

export const getJudicialProceduralWayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialProceduralWays = await service.findAll();
    res.json(judicialProceduralWays);
  } catch (error) {
    next(error);
  }
};
export const getJudicialProceduralWayByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialProceduralWays = await service.findAllByCHB(
      Number(req.query.chb)
    );
    res.json(judicialProceduralWays);
  } catch (error) {
    next(error);
  }
};

export const getJudicialProceduralWayByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialProceduralWay = await service.findByID(id);
    res.json(judicialProceduralWay);
  } catch (error) {
    next(error);
  }
};

export const createJudicialProceduralWayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialProceduralWay = await service.create(body);
    res.status(201).json(newJudicialProceduralWay);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialProceduralWayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialProceduralWay = await service.update(id, body);
    res.json(judicialProceduralWay);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialProceduralWayController = async (
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
