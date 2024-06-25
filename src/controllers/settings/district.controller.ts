import { Request, Response, NextFunction } from 'express'
import DistrictService from '../../app/settings/services/district.service'

const service = new DistrictService()

export const getDistrictsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await service.findAll();
  res.status(200).json(data);
};

export const getAllDistrictsByProvinceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { provinceId } = req.params;
  const data = await service.findAllByProvince(provinceId);
  res.status(200).json(data);
};
