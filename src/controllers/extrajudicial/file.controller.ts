import { Request, Response, NextFunction } from "express";
import FileService from "../../app/extrajudicial/services/file.service";

const service = new FileService();

export const findFileByClientIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const files = await service.find(Number(id));
    res.json(files);
  } catch (error) {
    next(error);
  }
};

export const findFileByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, idCustomer, code, chb } = req.params;
    const file = await service.findOne(
      Number(idCustomer),
      Number(chb),
      Number(code),
      Number(id)
    );
    res.json(file);
  } catch (error) {
    next(error);
  }
};

export const createFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.clientId = Number(req.params.id);
    req.body.idCustomer = Number(req.params.idCustomer);
    req.body.code = Number(req.params.code);
    req.body.chb = Number(req.params.chb);
    req.body.files = req.files;
    const { body } = req;
    const newFile = await service.create(body);
    res.status(201).json(newFile);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, code, idCustomer, chb } = req.params;
    await service.delete(
      Number(idCustomer),
      Number(chb),
      Number(code),
      Number(id)
    );
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
