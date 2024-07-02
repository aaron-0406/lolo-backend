import { Request, Response, NextFunction } from "express";
import ProvinceService from "../../app/settings/services/province.service";
const service = new ProvinceService();

export const getProvincesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await service.findAll();
  res.status(200).json(data);
};

export const getAllProvincesByDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { departmentId } = req.params;
  const data = await service.findAllByDepartment(departmentId);
  res.status(200).json(data);
};
