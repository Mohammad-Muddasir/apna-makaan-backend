const express = require("express");
const userRouter = express.Router();
const { createUser, uploadController } = require("../controllers/user");
const { handleFileUpload } = require('../middleware/fileUpload')
const auth = require("../middleware/middleware")
userRouter.post('/createUser',createUser)

userRouter.post("/uploadController",auth, handleFileUpload ,  uploadController);

module.exports = userRouter;


