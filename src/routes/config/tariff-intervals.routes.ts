import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { getTariffIntervalController } from '../../controllers/settings/tariff-interval.controller'

const router = Router();

router.get('/', JWTAuth, getTariffIntervalController);

export default router;