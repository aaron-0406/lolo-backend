import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { getDepartmentsController } from '../../controllers/settings/department.controller';

const router = Router();

router.get(
  '/',
  JWTAuth,
  getDepartmentsController,
)

export default router;