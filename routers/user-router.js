const express = require("express");
const { SignUp } = require("../controllers/users");
const UserRouter = express.Router();
UserRouter.post("/signup", SignUp);

module.exports = { UserRouter };
