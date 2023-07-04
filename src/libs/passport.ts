import passport from "passport";
import { Strategy } from "passport-local";
import AuthService from "../app/customers/services/auth.service";
import boom from "@hapi/boom";
import { ExtractJwt, Strategy as StrategyJWT } from "passport-jwt";
import config from "../config/config";

const service = new AuthService();
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
        return done(null, user.dataValues);
      } catch (error: any) {
        console.log(error);
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
