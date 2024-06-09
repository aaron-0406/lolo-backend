import { Router, Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { JWTAuth } from '../../middlewares/auth.handler';
import { compareExcelsController, sendReportByEmailController } from '../../controllers/settings/compare-excels.controller';
import { archivosExcel } from '../../middlewares/multer.handler';
import { compareExcelToSendEmailSchemas } from '../../app/settings/schemas/compare-excels.schema';
import validatorHandler from '../../middlewares/validator.handler';
const router = Router();

const multerFiles = archivosExcel.fields([
  { name: 'prevFile', maxCount: 1 },
  { name: 'newFile', maxCount: 1 }
]);

// Middleware para verificar que los archivos están presentes
const checkFiles = (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  if (!files || !files.prevFile || !files.newFile) {
    return next(boom.badRequest('Both files are required.'));
  }
  next();
};

router.post(
  '/compare',
  JWTAuth,
  multerFiles,
  checkFiles,
  compareExcelsController,
);

router.post(
  '/send-report-by-email',
  JWTAuth,
  validatorHandler(compareExcelToSendEmailSchemas, 'body'),
  sendReportByEmailController,
);

export default router;
