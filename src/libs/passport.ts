import passport from "passport";
import { Strategy } from "passport-local";
import AuthService from "../app/customers/services/auth.service";
import AuthServiceDash from "../app/boss/services/auth.service";
import boom from "@hapi/boom";
import { ExtractJwt, Strategy as StrategyJWT } from "passport-jwt";
import config from "../config/config";
import PermissionService from "../app/boss/services/permission.service";

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
      const { customerId } = req.body;
      try {
        const user = await service.login({ email, password, customerId });
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
