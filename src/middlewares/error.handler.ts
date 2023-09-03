import { NextFunction, Request, Response } from "express";
import { Boom } from "@hapi/boom";
import errorHandlers from "./utils/errorHandlers";

const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(err);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

const boomErrorHandler = (
  err: Boom,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

const ormErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorHandler = errorHandlers[err.constructor.name];
  if (errorHandler) {
    const { status, message, errors } = errorHandler(err);
    return res.status(status).json({ statusCode: status, message, errors });
  }
  next(err);
};

export default { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
