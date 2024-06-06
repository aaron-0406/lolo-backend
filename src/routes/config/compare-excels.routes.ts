import { Router, Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { JWTAuth } from '../../middlewares/auth.handler';
import { compareExcelsController } from '../../controllers/settings/compare-excels.controller';
import { archivosExcel } from '../../middlewares/multer.handler';

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

export default router;
