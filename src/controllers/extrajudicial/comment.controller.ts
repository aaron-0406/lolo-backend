import { Request, Response, NextFunction } from "express";
import CommentService from "../../app/extrajudicial/services/comment.service";
import UserLogService from "../../app/dash/services/user-log.service";
import commentModel from "../../db/models/comment.model";

const service = new CommentService();
const serviceUserLog = new UserLogService();

const { COMMENT_TABLE } = commentModel;

export const getAllCommentsByClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const comments = await service.findAllByClient(clientId);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P02-02-01-04",
        entity: COMMENT_TABLE,
        entityId: Number(clientId),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const getChartByCustomerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const comments: { fecha: string; cantidad: number }[] = await service.chart(
      clientId
    );

    const hoy = new Date();
    const primerDia = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1));
    const ultimoDia = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 7));

    const fechaInicio = new Date(primerDia);
    const fechaFin = new Date(ultimoDia);

    const diasSemana = [];

    while (fechaInicio <= fechaFin) {
      diasSemana.push({
        fecha: fechaInicio.toISOString().slice(0, 10),
        cantidad: 0,
      });
      fechaInicio.setDate(fechaInicio.getDate() + 1);
    }
    const diasFaltantes = diasSemana.filter(
      (dia) => !comments.some((r) => r.fecha === dia.fecha)
    );
    const resultadosFinales = [...comments, ...diasFaltantes];

    resultadosFinales.sort((a, b) => {
      const dateA = Date.parse(a.fecha);
      const dateB = Date.parse(b.fecha);
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    });
    res.json(resultadosFinales.map((objeto) => objeto.cantidad));
  } catch (error) {
    next(error);
  }
};

export const getCommentByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const comment = await service.findByID(id);
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

export const createCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newComment = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-01-01",
      entity: COMMENT_TABLE,
      entityId: Number(newComment.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const updateCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const comment = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-01-02",
      entity: COMMENT_TABLE,
      entityId: Number(comment.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P02-02-01-03",
      entity: COMMENT_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
