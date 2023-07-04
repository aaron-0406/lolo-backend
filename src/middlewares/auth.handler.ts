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
      if (err || !user) return next(boom.unauthorized(info.message));
      req.user = user;
      return next();
    }
  )(req, res, next);
};
