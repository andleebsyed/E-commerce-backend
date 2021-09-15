const express = require("express");
const {
  SignUp,
  Login,
  Account,
  SaveAddress,
  RemoveAddress,
} = require("../controllers/users");
const { verifyToken } = require("../middlewares/verifyToken");
const UserRouter = express.Router();
UserRouter.post("/signup", SignUp);
UserRouter.post("/login", Login);
UserRouter.post("/account", verifyToken, Account);
UserRouter.post("/addaddress", verifyToken, SaveAddress);
UserRouter.post("/removeaddress", verifyToken, RemoveAddress);
module.exports = { UserRouter };
