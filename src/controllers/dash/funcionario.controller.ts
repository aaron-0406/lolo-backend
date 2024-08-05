import { Request, Response, NextFunction } from "express";
import FuncionarioService from "../../app/dash/services/funcionario.service";
import UserLogService from "../../app/dash/services/user-log.service";
import funcionarioModel from "../../db/models/funcionario.model";

const service = new FuncionarioService();
const serviceUserLog = new UserLogService();

const { FUNCIONARIO_TABLE } = funcionarioModel;

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P08-01",
      entity: FUNCIONARIO_TABLE,
      entityId: Number(newFuncionario.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P08-02",
      entity: FUNCIONARIO_TABLE,
      entityId: Number(funcionario.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P08-03",
      entity: FUNCIONARIO_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
