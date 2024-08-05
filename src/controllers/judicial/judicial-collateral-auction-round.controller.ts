import { Request, Response, NextFunction } from "express";
import UserLogService from "../../app/dash/services/user-log.service";
import JudicialCollateralAuctionRoundService from "../../app/judicial/services/judicial-collateral-auction-round.service";
import judicialCollateralAuctionRoundModel from "../../db/models/judicial-collateral-auction-round.model";

const service = new JudicialCollateralAuctionRoundService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE } = judicialCollateralAuctionRoundModel;

export const getAllJudicialCollateralAuctionRoundController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collateralId, chb } = req.params;
    const collateralAuctionRounds = await service.findAllAuctionbyCollateralId( Number(collateralId), Number(chb), req.query);
    res.json(collateralAuctionRounds);
  } catch (error) {
    next(error);
  }
};

export const getAllJudicialAuctionsByCaseFileIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { caseFileId } = req.params;
    const collateralAuctionRounds = await service.findAllAuctionbyCaseFileId( Number(caseFileId));
    res.json(collateralAuctionRounds);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCollateralAuctionRoundById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb, collateralId, id } = req.params;
    const collateralAuctionRound = await service.getAuctionById(Number(chb), Number(collateralId), Number(id));
    res.json(collateralAuctionRound);
  } catch (error) {
    next(error);
  }
};

export const createJudicialCollateralAuctionRoundController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialCollateralAuctionRound = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-04-01",
      entity: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
      entityId: Number(newJudicialCollateralAuctionRound?.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newJudicialCollateralAuctionRound);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialCollateralAuctionRoundController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb, collateralId, id } = req.params;
    const body = req.body;
    const judicialCollateralAuctionRound = await service.update(Number(chb), Number(collateralId), Number(id), body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-04-02",
      entity: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(judicialCollateralAuctionRound?.newData);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialCollateralAuctionRoundController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb, collateralId, id } = req.params;
    const judicialCollateralAuctionRound = await service.delete(Number(chb), Number(collateralId), Number(id));
    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-06-01-04-03",
      entity: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });
    res.status(201).json(judicialCollateralAuctionRound);
  } catch (error) {
    next(error);
  }
};


