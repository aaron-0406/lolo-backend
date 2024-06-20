import { Request, Response, NextFunction } from "express";
import JudicialCollateralService from "../../app/judicial/services/judicial-collateral.service";

const service = new JudicialCollateralService();

export const findAllCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collaterals = await service.findAll();
    res.json(collaterals);
  } catch (error) {
    next(error);
  }
}

export const findAllCollateralByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const collaterals = await service.findAllByCHB(parseInt(chb));
    res.json(collaterals);
  } catch (error) {
    next(error);
  }
}

export const createCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newCollateral = await service.create(body);
    res.json(newCollateral);
  } catch (error) {
    next(error);
  }
}

export const updateCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const collateral = await service.update(id, body);
    res.json(collateral);
  } catch (error) {
    next(error);
  }
}


export const deletedCollateralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const collateral = await service.delete(id);
    res.json(collateral);
  } catch (error) {
    next(error);
  }
}


