import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { getTariffIntervalMatchController } from '../../controllers/settings/tariff-interval-match.controller'

const router = Router();

router.get('/', JWTAuth, getTariffIntervalMatchController);

export default router;