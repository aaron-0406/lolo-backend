import { Request, Response, NextFunction } from "express";
import JudicialBinnacleService from "../../app/judicial/services/judicial-binnacle.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialBinnacleModel from "../../db/models/judicial-binnacle.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new JudicialBinnacleService();
const serviceUserLog = new UserLogService();
const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;

export const getJudicialBinnacleByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fileCase } = req.params;
    const judicialBinnacles = await service.findAllByCHBAndFileCase(
      Number(fileCase),
      req.query
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
    const { binnacle, allBinFiles } = await service.create(body, files as [], {
      code: params.code,
      idCustomer: Number(params.idCustomer),
    });

    const { judicialBinFiles, ...restData} = binnacle.dataValues
    const sumary = generateLogSummary({
      method: req.method,
      id: binnacle.dataValues.id,
      newData: {
        ...restData,
        binFiles: JSON.stringify(
          allBinFiles.map((binFile) => binFile.dataValues.originalName)
        ),
      },
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-01-01",
      entity: JUDICIAL_BINNACLE_TABLE,
      entityId: Number(binnacle.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });
    res.status(201).json(binnacle);
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
    const { oldJudicialBinacle, newJudicialBinnacle } = await service.update(id, body, files as [], {
      code: params.code,
      idCustomer: Number(params.idCustomer),
    });

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialBinnacle.dataValues.id,
      oldData: oldJudicialBinacle,
      newData: newJudicialBinnacle.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-01-02",
      entity: JUDICIAL_BINNACLE_TABLE,
      entityId: Number(newJudicialBinnacle.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });
    res.json(newJudicialBinnacle);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialBinnacleTariffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { oldJudicialBinacle, newJudicialBinnacle } = await service.updateTariff(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialBinnacle.dataValues.id,
      oldData: {
        ...oldJudicialBinacle,
        tariffHistory: oldJudicialBinacle.tariffHistory.replace(/"/g, "").split(","),
      },
      newData: {
        ...newJudicialBinnacle.dataValues,
        tariffHistory: newJudicialBinnacle.dataValues.tariffHistory.replace(/"/g, "").split(","),
      },
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-01-02",
      entity: JUDICIAL_BINNACLE_TABLE,
      entityId: Number(newJudicialBinnacle.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });
    res.json(newJudicialBinnacle);
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
    const oldJudicialBinacle = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldJudicialBinacle,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-01-03",
      entity: JUDICIAL_BINNACLE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });
    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};
