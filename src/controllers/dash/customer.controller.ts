import { Request, Response, NextFunction } from "express";
import CustomerService from "../../app/customers/services/customer.service";

const service = new CustomerService();

export const getAllCustomersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

export const getCustomerByUrlIdentifierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { urlIdentifier } = req.params;
    const customer = await service.findOne(urlIdentifier);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const createCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newCustomer = await service.create(body);
    res.status(201).json(newCustomer);
  } catch (error) {
    next(error);
  }
};

export const updateCustomerStateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const customer = await service.updateState(id, body.state);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const updateCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const customer = await service.update(id, body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};
