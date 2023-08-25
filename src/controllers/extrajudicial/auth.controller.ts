import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { CustomerUserType } from "../../app/dash/types/customer-user.type";
import { signToken } from "../../libs/jwt";
import AuthService from "../../app/extrajudicial/services/auth.service";
import PermissionService from "../../app/dash/services/permission.service";
import CustomerUserService from "../../app/dash/services/customer-user.service";

const serviceAuth = new AuthService();
const servicePermission = new PermissionService();
const serviceCustomerUser = new CustomerUserService();

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

export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, repeatPassword } = req.body;
    await serviceAuth.changePassword(
      { newPassword, repeatPassword },
      Number(req.user?.id)
    );
    return res.json({ success: "Contraseña modificada" });
  } catch (error) {
    next(error);
  }
};

export const changeCredentialsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await serviceAuth.changeCredentials(req.body, Number(req.user?.id));
    const user = await serviceCustomerUser.findOne(String(req.user?.id));
    const permissions = await servicePermission.findAllByRoleId(
      user.dataValues.roleId
    );
    const codes = permissions.map((permissions) => permissions.code);
    const customerUser = { ...user.dataValues, permissions: codes };
    const token = signToken(customerUser, `${process.env.JWT_SECRET}`);
    return res.json({
      user: customerUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};
