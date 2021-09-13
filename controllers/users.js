const { User } = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SignUp = async (req, res) => {
  try {
    console.log(req.body);
    const secret = process.env.SECRET;
    let userDetails = req.body;
    console.log("coming here or not ", userDetails);
    const newUser = new User(userDetails);
    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(newUser.password, salt);
    const SavedUser = await newUser.save();
    console.log({ SavedUser });
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

module.exports = { SignUp };
