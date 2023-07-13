const express = require("express");
const {
  createProduct,
  getReviewProduct,
  updateProductType,
  getPublishProduct,
  deleteProduct,
} = require("../controllers/products");
const productRouter = express.Router();
const auth = require("../middleware/middleware")

productRouter.post("/listing", auth, createProduct);
productRouter.get("/properties", auth, getReviewProduct);
productRouter.post("/updateProduct", auth, updateProductType);
productRouter.get("/publishProperties", getPublishProduct);
productRouter.delete("/deleteProperties/:id", auth, deleteProduct);
module.exports = productRouter;