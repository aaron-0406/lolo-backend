import passport from "passport";
import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

// Authenticate by JWT
export const JWTAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err, user, info: TokenExpiredError) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        let errorMessage = "Inautorizado";
        if (info && info.name === "JsonWebTokenError")
          errorMessage = "Formato de token invalido!";
        if (info && info.name === "TokenExpiredError")
          errorMessage = "El token ha expirado";
        return next(boom.unauthorized(errorMessage));
      }
      req.user = user;
      return next();
    }
  )(req, res, next);
};

export const checkPermissions = (...permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const userPermissions = user?.permissions.map((permission: any) => {
      return permission.code;
    });

    if (!user) return next(boom.unauthorized("No JWT"));
    if (permissions.some((permission) => userPermissions?.includes(permission)))
      return next();

    return next(
      boom.unauthorized("No tienes permisos para realizar esta petición")
    );
  };
};
