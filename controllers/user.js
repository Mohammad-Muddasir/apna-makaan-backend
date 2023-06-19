const User = require("../model/user");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const Product = require("../model/products")

exports.createUser = async (req, res) => {
  try {
    // createUser
    const {
      name,
      email,
      password,
      phone,
      role
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !role
      ) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Required Fields",
      });
    }
    // Bcrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    console.log('=====>',user)
    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};



exports.uploadController = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path);
    const imageUrls = [];

    for (const imagePath of imagePaths) {
      const result = await cloudinary.uploader.upload(imagePath);
      const imageUrl = result.secure_url;
      imageUrls.push(imageUrl);
      console.log("URLs are:", imageUrls);
    }

    // Update the Product document with the imageUrls
    const  userId  = req.userId;
    console.log("====>userid",userId)
    const updatedProduct = await Product.findOneAndUpdate(
      { userId },
      { $set: { imageUrls } },
      { new: true }
    );

    res.status(200).json({ success: true, imageUrls, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




