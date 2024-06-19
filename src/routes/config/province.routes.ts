import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { getProvincesController } from '../../controllers/settings/province.controller';

const router = Router();

router.get(
  '/',
  JWTAuth,
  getProvincesController,
)

export default router;