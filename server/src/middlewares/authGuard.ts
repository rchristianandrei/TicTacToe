import passport from "passport";

export function authGuard() {
  return passport.authenticate("jwt", { session: false });
}
