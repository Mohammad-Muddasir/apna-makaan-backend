const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const productSchema = new mongoose.Schema({
  propertyType: {
    type: String,
  },
  propertyCondition: {
    type: String,
  },
  bedrooms: {
    type: String,
  },
  price: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  washrooms: {
    type: String,
  },
  area: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
  },
  imageUrls: [
    {
      type: String,
    },
  ],
  type: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);