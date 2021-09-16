const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AddressSchema = Schema({
  name: String,
  address: String,
  pincode: String,
  city: String,
});
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
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: Number,
    },
  ],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  addresses: [AddressSchema],
});

const User = model("User", UserSchema);

module.exports = { User };
