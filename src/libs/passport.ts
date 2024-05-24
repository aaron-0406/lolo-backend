import passport from "passport";
import { Strategy } from "passport-local";
import AuthService from "../app/extrajudicial/services/auth.service";
import AuthServiceDash from "../app/dash/services/auth.service";
import boom from "@hapi/boom";
import { ExtractJwt, Strategy as StrategyJWT } from "passport-jwt";
import config from "../config/config";
import PermissionService from "../app/dash/services/permission.service";

const service = new AuthService();
const servicePermission = new PermissionService();
const serviceDash = new AuthServiceDash();
// LOGIN
passport.use(
  "local.signin",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { customerId, code2fa } = req.body;
      try {
        const user = await service.login({
          email,
          password,
          customerId,
          code2fa,
        });

        if (!!user.dataValues.code2fa) {
          await service.verify2fa(code2fa, user.dataValues.id);
        } else {
          const qrCodeUrl = await service.generate2fa(
            user.dataValues.email,
            user.dataValues.id
          );
          return done(null, {
            qr: qrCodeUrl,
          });
        }

        const permissions = await servicePermission.findAllByRoleId(
          user.dataValues.roleId
        );
        const permissionsObject = permissions.map((permissions) => {
          return {
            id:permissions.id,
            code: permissions.code,
            link: permissions.link,
            icon: permissions.icon,
            name: permissions.name,
            idPermissionMain: permissions.idPermissionMain,
            isDropdown: permissions.isDropdown,

          };
        });
        return done(null, {
          ...user.dataValues,
          permissions: permissionsObject,
        });
      } catch (error: any) {
        return done(boom.badRequest(error), false);
      }
    }
  )
);

passport.use(
  "local.signinDash",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await serviceDash.login({ email, password });
        const permissions = await servicePermission.findAllByRoleId(
          user.dataValues.roleId
        );
        const codes = permissions.map((permissions) => permissions.code);
        return done(null, { ...user.dataValues, permissions: codes });
      } catch (error: any) {
        return done(boom.badRequest(error), false);
      }
    }
  )
);

// Passport con JWT
passport.use(
  "jwt",
  new StrategyJWT(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    },
    async (payload, done) => {
      try {
        return done(null, payload);
      } catch (error) {
        console.log(error);
        return done(error, payload);
      }
    }
  )
);
