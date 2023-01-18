import mongoose from "mongoose";
import argon2 from "argon2";

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
    profilePic: {
      type: String,
      default:
        "https://i.pinimg.com/originals/da/4f/ad/da4fad3f0c9549a86a70dc90d9208e8d.jpg",
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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

UserSchema.virtual("fullname").get(function () {
  return [this.firstname, this.lastname].filter(Boolean).join(" ");
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await argon2.hash(this.password);
});

export default mongoose.model("User", UserSchema);
