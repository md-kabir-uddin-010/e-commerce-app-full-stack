const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const pepoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      default: "default.png",
    },
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    verifyed: {
      type: Boolean,
      default: false,
    },
    scope: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
  },
  { timestamps: true }
);

//hash password before save
pepoleSchema.pre("save", async function (next) {
  try {
    if (this.isNew && this.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(this.password, salt);
      this.password = hashPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

//password validity check
pepoleSchema.methods.isValidPassword = async function (password) {
  try {
    if (this.password) {
      return await bcrypt.compare(password, this.password);
    }
  } catch (error) {
    throw error;
  }
};

const Pepole = model("pepole", pepoleSchema);
module.exports = Pepole;
