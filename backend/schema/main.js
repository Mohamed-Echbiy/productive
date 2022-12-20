const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema(
  {
    email: {
      required: [
        true,
        "this is a required failed please make sure to add your email ",
      ],
      type: String,
    },
    password: {
      type: String,
      required: [
        true,
        "this is a required failed please make sure to add your password",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", dbSchema);
