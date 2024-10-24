import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { CustomerUserType } from "../../app/dash/types/customer-user.type";
import { signToken } from "../../libs/jwt";
import AuthService from "../../app/extrajudicial/services/auth.service";
import PermissionService from "../../app/dash/services/permission.service";
import CustomerUserService from "../../app/dash/services/customer-user.service";
import UserLogService from "../../app/dash/services/user-log.service";
import userAppModel from "../../db/models/user-app.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const serviceAuth = new AuthService();
const servicePermission = new PermissionService();
const serviceCustomerUser = new CustomerUserService();
const serviceUserLog = new UserLogService();

const { USER_APP_TABLE } = userAppModel;

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate("local.signin", { session: false }, (err, user) => {
      if (err) return next(err);

      if (user.qr) {
        return res.json({
          message:
            "Utiliza tu aplicación para escanear el código QR y comenzar la autenticación de dos pasos.",
          qr: user.qr,
        });
      } else {
        const { password, permissions, ...rest } = user as CustomerUserType;
        const token = signToken(rest, `${process.env.JWT_SECRET}`);
        return res.json({
          success: "Sesión Iniciada",
          user: { ...rest, permissions },
          token,
        });
      }
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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P01-01",
      entity: USER_APP_TABLE,
      entityId: Number(req.user?.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

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
    const oldCustomerUser = await serviceAuth.changeCredentials(req.body, Number(req.user?.id));
    const user = await serviceCustomerUser.findOne(String(req.user?.id));
    const permissions = await servicePermission.findAllByRoleId(
      user.dataValues.roleId
    );
    const customerUser = { ...user.dataValues, permissions };
    const token = signToken(user.dataValues, `${process.env.JWT_SECRET}`);

    const sumary = generateLogSummary({
      method: "PUT",
      id: oldCustomerUser.id,
      oldData: oldCustomerUser,
      newData: user.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P01-02",
      entity: USER_APP_TABLE,
      entityId: Number(req.user?.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    return res.json({
      user: customerUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};
