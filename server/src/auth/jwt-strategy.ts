import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import userRepo from "../repo/userRepo";

export default passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "1234567890",
    },
    async (payload, done) => {
      const user = await userRepo.findUserById(payload.id.toString());

      return user ? done(null, user) : done("Invalid Token", null);
    }
  )
);
