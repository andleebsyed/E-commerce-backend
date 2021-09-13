const express = require("express");
const { SignUp, Login } = require("../controllers/users");
const UserRouter = express.Router();
UserRouter.post("/signup", SignUp);
UserRouter.post("/login", Login);

module.exports = { UserRouter };
