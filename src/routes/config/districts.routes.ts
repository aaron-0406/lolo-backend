import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { getDistrictsController, getAllDistrictsByProvinceController } from '../../controllers/settings/district.controller';
import districtSchema from '../../app/settings/schemas/district.schema';
import validatorHandler from '../../middlewares/validator.handler';

const { getDistrictByProvinceSchema } = districtSchema;

const router = Router();

router.get(
  '/',
  JWTAuth,
  getDistrictsController,
)

router.get(
  "/:provinceId",
  JWTAuth,
  validatorHandler(getDistrictByProvinceSchema, "params"),
  getAllDistrictsByProvinceController,
)

export default router;