const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
    },
    task: {
      type: String,
      required: [true, "make sure to add the title property"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      default: "low",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", dbSchema);
