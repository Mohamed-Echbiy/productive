const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "make sure to add the title property"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", dbSchema);
