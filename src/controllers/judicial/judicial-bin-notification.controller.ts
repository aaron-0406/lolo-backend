import { Request, Response, NextFunction } from "express"
import JudicialBinNotificationService from "../../app/judicial/services/judicial-bin-notification.service"

const service = new JudicialBinNotificationService()

export const getAllNotificationsByBinnacleIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { binnacleId } = req.params;
    const notifications = await service.findAllByBinnacleId(Number(binnacleId));
    res.json(notifications);
  } catch (error) {
    console.log(error)
    next(error)
  }
}