import { Request, Response, NextFunction } from "express";
import CustomerHasBankService from "../app/customers/services/customer-has-bank.service";

const service = new CustomerHasBankService();

export const getCustomerHasBankController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customersBanks = await service.findAll();
    res.json(customersBanks);
  } catch (error) {
    next(error);
  }
};

export const getCustomerHasBankByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const customerBank = await service.findOneById(id);
    res.json(customerBank);
  } catch (error) {
    next(error);
  }
};

export const getCustomerHasBankByCustomerAndBankController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCustomer, idBank } = req.params;
    const customerBank = await service.findOneByCustomerAndBank(idCustomer, idBank);
    res.json(customerBank);
  } catch (error) {
    next(error);
  }
};

export const createCustomerHasBankController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newCustomerBank = await service.assign(body);
    res.status(201).json(newCustomerBank);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomerHasBankController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCustomer, idBank } = req.params;
    await service.delete(idCustomer, idBank);
    res.status(201).json({ idCustomer, idBank });
  } catch (error) {
    next(error);
  }
};
