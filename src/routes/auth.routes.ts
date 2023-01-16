import { Router } from "express";
import validatorHandler from "../middlewares/validator.handler";
import authSchema from "../app/customers/schemas/auth.schema";
import passport from "passport";
import { signToken } from "../libs/jwt";
import { CustomerUserType } from "../app/customers/types/customer-user.type";

const { loginSchema } = authSchema;

const router = Router();

router.post(
  "/signin",
  validatorHandler(loginSchema, "body"),
  async (req, res, next) => {
    try {
      passport.authenticate("local.signin", { session: false }, (err, user) => {
        if (err) return next(err);
        // Singing token with the user
        const { password, ...rest } = user.dataValues as CustomerUserType;
        const token = signToken(rest, `${process.env.JWT_SECRET}`);
        return res.json({ success: "Sesión Iniciada", rest, token });
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
