import { Request, Response, NextFunction } from "express";
import ManagementActionService from "../../app/dash/services/management-action.service";
const service = new ManagementActionService();

export const getManagementActionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const managementActions = await service.findAll();
    res.json(managementActions);
  } catch (error) {
    next(error);
  }
};

export const getManagementActionByCHBControllerPaginated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const { data, quantity, pages } = await service.findAllByCHBPaginated(
      chb,
      req.query
    );
    res.json({ data, quantity, pages });
  } catch (error) {
    next(error);
  }
};

export const getManagementActionByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const managementActions = await service.findAllByCHB(chb);
    res.json(managementActions);
  } catch (error) {
    next(error);
  }
};

export const getManagementActionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const managementAction = await service.findOne(id);
    res.json(managementAction);
  } catch (error) {
    next(error);
  }
};

export const createManagementActionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newManagementAction = await service.create(body);
    res.status(201).json(newManagementAction);
  } catch (error) {
    next(error);
  }
};

export const updateManagementActionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const managementAction = await service.update(id, body);
    res.json(managementAction);
  } catch (error) {
    next(error);
  }
};

export const deleteManagementActionController = async (
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
