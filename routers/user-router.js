const express = require("express");
const { SignUp, Login, Account } = require("../controllers/users");
const { verifyToken } = require("../middlewares/verifyToken");
const UserRouter = express.Router();
UserRouter.post("/signup", SignUp);
UserRouter.post("/login", Login);
UserRouter.post("/account", verifyToken, Account);

module.exports = { UserRouter };
