import dotenv from "dotenv";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import userRepo from "../repo/userRepo";

dotenv.config();

const SERVERKEY: string = process.env.SERVERKEY || "";

export default passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SERVERKEY,
    },
    async (payload, done) => {
      const user = await userRepo.findUserById(payload.id.toString());

      return user ? done(null, user) : done("Invalid Token", null);
    }
  )
);
