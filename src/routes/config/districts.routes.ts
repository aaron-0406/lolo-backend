import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { getDistrictsController } from '../../controllers/settings/district.controller';

const router = Router();

router.get(
  '/',
  JWTAuth,
  getDistrictsController,
)

export default router;