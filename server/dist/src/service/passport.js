"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPassportStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const index_1 = require("../model/index");
const applyPassportStrategy = (passport) => {
    const options = {};
    options.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = "thisisecret";
    passport.use(new passport_jwt_1.Strategy(options, (payload, done) => {
        index_1.userModel.findOne({ email: payload.email }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                const data = {
                    email: user.email,
                    _id: user['_id'],
                };
                return done(null, data);
            }
            return done(null, false);
        });
    }));
};
exports.applyPassportStrategy = applyPassportStrategy;
