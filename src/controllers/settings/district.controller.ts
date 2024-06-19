import { Request, Response, NextFunction } from 'express'
import DistrictService from '../../app/settings/services/district.service'

const service = new DistrictService()

export const getDistrictsController = async (req: Request, res: Response, next: NextFunction) => {
    const data = await service.findAll()
    res.status(200).json(data)
}

