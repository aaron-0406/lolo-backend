import { Request, Response, NextFunction } from 'express'
import CompareExcelsService from '../../app/settings/services/compare-excels.service'
import fs from "fs"

const service = new CompareExcelsService()

export const compareExcelsController = async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const prevFile = files.prevFile[0]
    const newFile = files.newFile[0]

    const data = await service.compareExcels(prevFile, newFile)
    res.status(200).json(data)

    fs.unlinkSync(prevFile.path)
    fs.unlinkSync(newFile.path)
}

export const sendReportByEmailController = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body
  await service.sendReportByEmail(data)
  res.status(200).json({ success: "Reporte enviado" })
}