const express = require("express");
const {
  SignUp,
  Login,
  Account,
  SaveAddress,
  RemoveAddress,
  UpdateProfile,
} = require("../controllers/users");
const { verifyToken } = require("../middlewares/verifyToken");
const UserRouter = express.Router();
UserRouter.post("/signup", SignUp);
UserRouter.post("/login", Login);
UserRouter.post("/account", verifyToken, Account);
UserRouter.post("/addaddress", verifyToken, SaveAddress);
UserRouter.post("/removeaddress", verifyToken, RemoveAddress);
UserRouter.post("/updateprofile", verifyToken, UpdateProfile);

module.exports = { UserRouter };
