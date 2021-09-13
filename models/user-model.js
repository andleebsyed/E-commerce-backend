const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

const User = model("User", UserSchema);

module.exports = { User };
