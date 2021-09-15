const express = require("express");
const { SignUp, Login, Account, SaveAddress } = require("../controllers/users");
const { verifyToken } = require("../middlewares/verifyToken");
const UserRouter = express.Router();
UserRouter.post("/signup", SignUp);
UserRouter.post("/login", Login);
UserRouter.post("/account", verifyToken, Account);
UserRouter.post("/address", verifyToken, SaveAddress);
module.exports = { UserRouter };
