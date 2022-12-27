import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      minlength: [3, "Firstname is too short"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
      minlength: [3, "lastname is too short"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          const mailFormat =
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

          if (v.match(mailFormat)) {
            return true;
          } else {
            return false;
          }
        },
        message: (props) => "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password is less than 8 characters"],
      select: false,
      validate: {
        validator: function (v) {
          const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

          if (!v.match(passwordFormat)) {
            return false;
          }

          return true;
        },
        message: (props) => "Enter strong password",
      },
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "vendor", "admin"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
