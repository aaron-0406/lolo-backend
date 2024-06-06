import { Request, Response, NextFunction } from 'express';
import CompareExcelsService from '../../app/settings/services/compare-excels.service';
import fs from 'fs';
const service = new CompareExcelsService();

export const compareExcelsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const prevFile = files.prevFile[0];
    const newFile = files.newFile[0];

    const reportPath = await service.compareExcels(prevFile, newFile);
    console.log(reportPath)
    res.download(reportPath, 'report.xlsx',
    //   (err) => {
    //   if (err) {
    //     next(err);
    //   } else {
    //     fs.unlink(reportPath, (err) => {
    //       if (err) console.error('Error deleting the report file:', err);
    //     });
    //     fs.unlink(prevFile.path, (err) => {
    //       if (err) console.error('Error deleting the previous file:', err);
    //     });
    //     fs.unlink(newFile.path, (err) => {
    //       if (err) console.error('Error deleting the new file:', err);
    //     });
    //   }
    // }
  );

  } catch (error) {
    next(error);
  }
};
