const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetPinSchema = new Schema({
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
