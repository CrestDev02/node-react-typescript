import { Strategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../model/index";

interface IUser{
  email: string,
  _id: string
}

export const applyPassportStrategy = (passport: any) => {
  const options: any = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = "thisisecret";
  passport.use(
    new Strategy(options, (payload, done) => {
      userModel.findOne({ email: payload.email }, (err:Error, user:any) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          const data: IUser = {
            email: user.email,
            _id: user['_id'],
          }
          return done(null, data);
        }
        return done(null, false);
      });
    })
  );
};
