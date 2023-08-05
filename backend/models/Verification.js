const { Schema, model } = require("mongoose");
const verificationSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Verification = model("verification", verificationSchema);
module.exports = Verification;
