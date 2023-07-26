import { Router } from "express";
import validatorHandler from "../../middlewares/validator.handler";
import authSchema from "../../app/boss/schemas/auth.schema";
import passport from "passport";
import { signToken } from "../../libs/jwt";
import { UserAppType } from "../../app/boss/types/user-app";

const { loginSchema } = authSchema;
const router = Router();

router.post(
  "/signin",
  validatorHandler(loginSchema, "body"),
  async (req, res, next) => {
    try {
      passport.authenticate("local.signinDash", { session: false }, (err, user) => {
        if (err) return next(err);
        const { password, ...rest } = user as UserAppType;
        const token = signToken(rest, `${process.env.JWT_SECRET}`);
        return res.json({ success: "Sesión Iniciada", user: rest, token });
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
