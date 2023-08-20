import { Request, Response, NextFunction } from "express";
import CustomerHasBankService from "../../app/dash/services/customer-has-bank.service";

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

export const getCustomerHasBankByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCustomer } = req.params;
    const customerBank = await service.findAllByCustomerId(idCustomer);
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
    const { id } = req.params;
    await service.revoke(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
