import passport from "passport";
import { Strategy } from "passport-local";
import AuthService from "../app/customers/services/auth.service";
import AuthServiceDash from "../app/boss/services/auth.service";
import boom from "@hapi/boom";

const service = new AuthService();
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

        return done(null, user);
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
        const user = await serviceDash.login({ email, password});

        return done(null, user);
      } catch (error: any) {
        return done(boom.badRequest(error), false);
      }
    }
  )
);
