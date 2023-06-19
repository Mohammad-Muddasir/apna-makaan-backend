const express = require("express");
const {
  createProduct,
  getReviewProduct,
  updateProductType,
  getPublishProduct,
} = require("../controllers/products");
const productRouter = express.Router();
const auth = require("../middleware/middleware")

productRouter.post("/listing", auth, createProduct);
productRouter.get("/properties",auth, getReviewProduct);
productRouter.post("/updateProduct", auth, updateProductType);
productRouter.get("/publishProperties", auth, getPublishProduct);
module.exports = productRouter;