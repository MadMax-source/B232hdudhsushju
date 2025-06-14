const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema({
  telegram_id: { type: Number, required: true, unique: true },
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  is_bot: { type: Boolean, default: false },
  language_code: { type: String },
  chat_id: { type: Number },

  isConfirmed: { type: Boolean, default: false },
  confirmationRequest: Date,
  loginRequired: { type: Boolean, default: true },
  state: { type: String },
  tempPassword: { type: String },

  wallet: {
    publicKey: { type: String },
    privateKey: { type: String },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
