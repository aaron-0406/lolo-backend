import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { CustomerUserType } from "../app/customers/types/customer-user.type";
import { signToken } from "../libs/jwt";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate("local.signin", { session: false }, (err, user) => {
      if (err) return next(err);
      // Singing token with the user
      const { password, ...rest } = user as CustomerUserType;
      const token = signToken(rest, `${process.env.JWT_SECRET}`);
      return res.json({ success: "Sesión Iniciada", user: rest, token });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};
