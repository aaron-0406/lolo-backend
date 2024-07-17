import { Request, Response, NextFunction } from "express";
import DepartmentService from "../../app/settings/services/department.service";

const service = new DepartmentService();

export const getDepartmentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await service.findAll();
  res.status(200).json(data);
};
