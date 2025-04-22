const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const db = require("../db/queries");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use .env in production

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // looks for token in Authorization header: Bearer <token>
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("JWT Payload:", jwt_payload);
    try {
      const user = await db.getUser(jwt_payload.id);
      console.log("Fetched User:", user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }),
);
