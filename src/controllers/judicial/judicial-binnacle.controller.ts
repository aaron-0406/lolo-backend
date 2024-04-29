import { Request, Response, NextFunction } from "express";
import JudicialBinnacleService from "../../app/judicial/services/judicial-binnacle.service";

const service = new JudicialBinnacleService();

export const getJudicialBinnacleByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fileCase } = req.params;
    const judicialBinnacles = await service.findAllByCHBAndFileCase(
      Number(fileCase)
    );
    res.json(judicialBinnacles);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getJudicialBinnacleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialBinnacle = await service.findByID(id);
    res.json(judicialBinnacle);
  } catch (error) {
    next(error);
  }
};

export const createJudicialBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, files, params } = req;
    const newJudicialBinnacle = await service.create(body, files as [], {
      code: params.code,
      idCustomer: Number(params.idCustomer),
    });

    res.status(201).json(newJudicialBinnacle);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body, files, params } = req;
    const judicialBinnacle = await service.update(id, body, files as [], {
      code: params.code,
      idCustomer: Number(params.idCustomer),
    });
    res.json(judicialBinnacle);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};
