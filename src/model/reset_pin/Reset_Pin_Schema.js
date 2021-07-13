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
    required: true,
  },
});

module.exports = {
  ResetPinSchema: mongoose.model("Reset_pin", ResetPinSchema),
};
