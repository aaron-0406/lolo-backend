import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";
import { Boom } from "@hapi/boom";

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
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
};

export default { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
