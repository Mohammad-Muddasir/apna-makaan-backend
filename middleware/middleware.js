const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log("===>",req.headers.token)
  if (req.headers && req.headers.token) {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    req.email = decoded.email;
    req.userId = decoded.userId;
    console.log("=====>User id:", decoded.userId);
    console.log("=====>Email", decoded.email);
    console.log("decoded =====>", decoded);
    next();
  } else {
    res.status(400).json({
      message: "user is not authenticate",
    });
  }
};

module.exports = auth;
