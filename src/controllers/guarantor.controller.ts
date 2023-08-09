import { Request, Response, NextFunction } from "express";
import GuarantorService from "../app/extrajudicial/services/guarantor.service";
const service = new GuarantorService();

export const getGuarantorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guarantors = await service.findAll();
    res.json(guarantors);
  } catch (error) {
    next(error);
  }
};

export const getGuarantorByClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const guarantors = await service.findAllByClient(clientId);
    res.json(guarantors);
  } catch (error) {
    next(error);
  }
};

export const getGuarantorByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const guarantor = await service.findByID(id);
    res.json(guarantor);
  } catch (error) {
    next(error);
  }
};

export const createGuarantorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newGuarantor = await service.create(body);
    res.status(201).json(newGuarantor);
  } catch (error) {
    next(error);
  }
};

export const updateGuarantorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const guarantor = await service.update(id, body);
    res.json(guarantor);
  } catch (error) {
    next(error);
  }
};

export const deleteGuarantorController = async (
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
