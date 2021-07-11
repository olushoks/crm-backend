const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: { type: String, maxlength: 50, required: true },
  company: { type: String, maxlength: 50, required: true },
  address: { type: String, maxlength: 100 },
  phone: { type: Number, maxlength: 11 },
  email: { type: String, maxlength: 50, required: true },
  password: { type: String, minlength: 8, maxlength: 50, required: true },
});

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};
