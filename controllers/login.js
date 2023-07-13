const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.userLogin = async (req, res) => {
  try {
    console.log("===>", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill required fields" });
    }
    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "No User with this email" });
    }
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Password is wrong" });
    }
    const currentDate = new Date().toLocaleDateString(); // Get current date
    const currentTime = new Date().toLocaleTimeString(); // Get current time
    // If the password is correct, generate a token and send it back to the client
    const token = jwt.sign(
      { name:user.name , userId: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: process.env.LIFE_TIME }
    );

    res.status(200).json({
      success: true,
      message: "Logged in",
      token,
      Role: user.role,
      Time: `User login at ${currentDate} ${currentTime}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
