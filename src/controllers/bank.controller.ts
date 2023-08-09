import { Request, Response, NextFunction } from "express";
import BankService from "../app/boss/services/bank.service";

const service = new BankService();

export const getBanksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const banks = await service.findAll();
    res.json(banks);
  } catch (error) {
    next(error);
  }
};

export const getBankByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bank = await service.findOne(id);
    res.json(bank);
  } catch (error) {
    next(error);
  }
};

export const createBankController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newBank = await service.create(body);
    res.status(201).json(newBank);
  } catch (error) {
    next(error);
  }
};

export const updateBankController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const bank = await service.update(id, body);
    res.json(bank);
  } catch (error) {
    next(error);
  }
};

export const deleteBankController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
