import passport from "passport";
import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import PermissionService from "../app/dash/services/permission.service";

const servicePermission = new PermissionService();

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
  return async (req: Request, res: Response, next: NextFunction) => {
    const findPermissions = await servicePermission.findAllByRoleId(
      req.user?.roleId ?? 0
    );
    const user = req.user;
    const userPermissions = findPermissions?.map((permission: any) => {
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

export const checkPermissionsWithoutParams = async (
  permissions: [...permissions: string[]],
  user?: Express.User
) => {
  const findPermissions = await servicePermission.findAllByRoleId(
    user?.roleId ?? 0
  );

  const userPermissions = findPermissions?.map((permission: any) => {
    return permission.code;
  });

  if (!user) return false;
  if (permissions.some((permission) => userPermissions?.includes(permission)))
    return true;

  return false;
};
