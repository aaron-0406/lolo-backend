import { Request, Response, NextFunction } from "express";
import JudicialObsFileService from "../../app/judicial/services/judicial-obs-file.service";

const service = new JudicialObsFileService();

export const findFileByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, idCustomer, chb, code, judicialFileCaseId } = req.params;
    const file = await service.findOne(
      Number(idCustomer),
      Number(chb),
      code,
      Number(judicialFileCaseId),
      Number(id)
    );

    res.json(file);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteJudicialObsFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, idCustomer, chb, code, judicialFileCaseId } = req.params;
    await service.delete(
      id,
      Number(idCustomer),
      Number(chb),
      code,
      Number(judicialFileCaseId)
    );
    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};
