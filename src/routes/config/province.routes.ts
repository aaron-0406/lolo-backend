import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { getProvincesController, getAllProvincesByDepartmentController } from '../../controllers/settings/province.controller';
import procinceSchema from '../../app/settings/schemas/province.schema';
import validatorHandler from '../../middlewares/validator.handler';

const { getProvinceByDepartmentSchema } = procinceSchema;

const router = Router();

router.get(
  '/',
  JWTAuth,
  getProvincesController,
)

router.get(
  '/:departmentId',
  JWTAuth,
  validatorHandler(getProvinceByDepartmentSchema, "params"),
  getAllProvincesByDepartmentController,
)

export default router;