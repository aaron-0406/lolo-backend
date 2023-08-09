import { Request, Response, NextFunction } from "express";
import FuncionarioService from "../app/boss/services/funcionario.service";

const service = new FuncionarioService();

export const getFuncionariosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const funcionarios = await service.findAll();
    res.json(funcionarios);
  } catch (error) {
    next(error);
  }
};

export const getFuncionariosByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const funcionario = await service.findAllByCHB(chb);
    res.json(funcionario);
  } catch (error) {
    next(error);
  }
};

export const getFuncionarioByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const funcionario = await service.findOne(id);
    res.json(funcionario);
  } catch (error) {
    next(error);
  }
};

export const createFuncionarioController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newFuncionario = await service.create(body);
    res.status(201).json(newFuncionario);
  } catch (error) {
    next(error);
  }
};

export const updateFuncionarioController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const funcionario = await service.update(id, body);
    res.json(funcionario);
  } catch (error) {
    next(error);
  }
};

export const deleteFuncionarioController = async (
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
