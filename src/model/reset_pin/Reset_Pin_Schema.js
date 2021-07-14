const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ResetPinSchema = new schema({
  pin: {
    type: String,
    minlength: 6,
    maxlength: 6,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
  added_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = {
  ResetPinSchema: mongoose.model("Reset_pin", ResetPinSchema),
};
