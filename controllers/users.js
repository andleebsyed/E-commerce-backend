const { User } = require("../models/user-model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SignUp = async (req, res) => {
  try {
    const secret = process.env.SECRET;
    let userDetails = req.body;
    const newUser = new User(userDetails);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const SavedUser = await newUser.save();
    const token = jwt.sign({ userId: SavedUser._id }, secret, {
      expiresIn: "24h",
    });
    res.json({
      status: true,
      message: "user added successfully",
      token,
      userId: SavedUser._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.json({
        status: false,
        code: 11000,
        message: "couldn't add user",
        errorDetail: error.message,
        existingField: Object.keys(error.keyPattern)[0],
      });
    }
    res.json({
      status: false,
      message: "couldn't add user",
      errorDetail: error.message,
    });
  }
};
const Login = async (req, res) => {
  try {
    const secret = process.env.SECRET;
    const userDetails = req.body;
    const ourUser = await User.findOne({ username: userDetails.username })
      .select("-__v ")
      .populate("wishlist cart.product");
    if (ourUser) {
      const validPassword = await bcrypt.compare(
        userDetails.password,
        ourUser.password
      );
      if (validPassword) {
        const token = jwt.sign({ userId: ourUser._id }, secret, {
          expiresIn: "24h",
        });
        ourUser.password = undefined;
        res.json({
          status: true,
          allowUser: true,
          message: "logged in successfully",
          token,
          userId: ourUser._id,
          account: ourUser,
        });
      } else {
        res.json({
          status: true,
          allowUser: false,
          message: "username and/or password incorrect",
        });
      }
    } else {
      res.json({
        status: true,
        allowUser: false,
        message: "username and/or password incorrect",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      errorDetail: error,
      errorMesssage: error.message,
    });
  }
};
const Account = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId)
      .select("-__v -password ")
      .populate("wishlist cart.product");
    res.json({
      status: true,
      message: "user Account fetched successfully",
      account: user,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "couldn't fetch user account",
      errorDetail: error?.message,
    });
  }
};

const SaveAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    const user = await User.findById(userId);
    user.addresses.push(address);
    const response = await user.save();
    res.json({
      status: true,
      message: "address added successfully",
      addresses: response.addresses,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "failed to add new address",
      errorDetail: error.message,
    });
  }
};
const RemoveAddress = async (req, res) => {
  try {
    const { addressId, userId } = req.body;
    const user = await User.findById(userId);
    user.addresses = user.addresses.filter(
      (address) => !address._id.equals(addressId)
    );
    const response = await user.save();
    res.json({
      status: true,
      message: "address deleted successfully",
      addresses: response.addresses,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "failed to delete the  address",
      errorDetail: error.message,
    });
  }
};

const UpdateProfile = async (req, res) => {
  let msg;
  console.log(req.body, " req.body");

  try {
    const { userId, newUsername, newEmail, newName } = req.body;
    async function checkForExistingEmail() {
      const ifEmailPresent = await User.findOne({ email: newEmail });

      if (ifEmailPresent && !ifEmailPresent._id.equals(userId)) {
        return res.status(500).json({
          status: false,
          unique: false,
          message: "email already in use",
        });
      } else {
        return false;
      }
    }

    async function checkForExistingUserName() {
      const ifUsernamePresent = await User.findOne({ username: newUsername });
      if (ifUsernamePresent && !ifUsernamePresent._id.equals(userId)) {
        return res.status(500).json({
          status: false,
          unique: false,
          message: "username already in use",
        });
      } else {
        return false;
      }
    }
    const emailStatus = await checkForExistingEmail();
    const usernameStatus = await checkForExistingUserName();

    if (emailStatus === false && usernameStatus === false) {
      const response = await User.findOneAndUpdate(
        { _id: userId },
        { username: newUsername, email: newEmail, name: newName },
        { new: true }
      )
        .select("-__v -password")
        .populate("cart.product wishlist");
      return res.json({
        status: true,
        message: "User Updated successfully",
        account: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "couldn't update user",
      newMessage: msg,
      error: error,
      errMessage: error.message,
    });
  }
};
const UpdatePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    const currentUser = await User.findById(userId);
    const validPassword = await bcrypt.compare(
      currentPassword,
      currentUser.password
    );
    if (validPassword) {
      const salt = await bcrypt.genSalt(10);
      currentUser.password = await bcrypt.hash(newPassword, salt);
      await currentUser.save();
      res.json({ status: true, message: "Password updated" });
    } else {
      res.status(500).json({
        status: false,
        message: "Current Password incorrect.Try again with correct password.",
      });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const GuestAccess = async (req, res) => {
  try {
    const secret = process.env.SECRET;
    const userId = mongoose.Types.ObjectId("6143353d1eff2741acd9556a");
    const ourUser = await User.findById(userId)
      .select("-__v ")
      .populate("wishlist cart.product");
    const token = jwt.sign({ userId: ourUser._id }, secret, {
      expiresIn: "24h",
    });
    ourUser.password = undefined;
    res.json({
      status: true,
      allowUser: true,
      message: "logged in successfully",
      token,
      userId: ourUser._id,
      account: ourUser,
      // cart: ourUser.cart,
    });
  } catch (error) {
    res.json({
      status: false,
      errorDetail: error,
      errorMesssage: error.message,
    });
  }
};
module.exports = {
  SignUp,
  Login,
  Account,
  SaveAddress,
  RemoveAddress,
  UpdateProfile,
  UpdatePassword,
  GuestAccess,
};
