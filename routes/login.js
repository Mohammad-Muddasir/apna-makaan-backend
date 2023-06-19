const express = require("express");
const { userLogin } = require("../controllers/login");
const loginRouter = express.Router();

loginRouter.post("/Login", userLogin);
module.exports = loginRouter;