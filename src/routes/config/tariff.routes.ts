import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { getTariffsController } from '../../controllers/settings/tariff.controller'

const router = Router();

router.get("/", JWTAuth, getTariffsController);

export default router;  