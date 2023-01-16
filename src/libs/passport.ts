import passport from "passport";
import { Strategy } from "passport-local";
import AuthService from "../app/customers/services/auth.service";
import boom from "@hapi/boom";

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
      try {
        const user = await service.login({ email, password });

        return done(null, user);
      } catch (error: any) {
        console.log(error);
        return done(boom.badRequest(error), false);
      }
    }
  )
);
