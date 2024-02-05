import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { signToken } from "../../libs/jwt";
import { UserAppType } from "../../app/dash/types/user-app";

export const loginDashController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      "local.signinDash",
      { session: false },
      (err, user) => {
        if (err) return next(err);
        const { password, ...rest } = user as UserAppType;
        const token = signToken(rest, `${process.env.JWT_SECRET}`);
        return res.json({ success: "Sesión Iniciada", user: rest, token });
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};
