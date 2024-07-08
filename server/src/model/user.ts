import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      default:''
    },
    password: {
      type: String,
      required: true,
    },
    github_username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods   = {
   
  comparePassword(passw:string, cb:Function) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
              if (err) {
                  return cb(err);
              }
              cb(null, isMatch);
          });
  },
}

export const userModel = mongoose.model("User", UserSchema);
