const Product = require("../model/products")


exports.createProduct = async (req, res) => {
    try {
        // createProduct
        const {
          propertyType,
          propertyCondition,
          bedrooms,
          washrooms,
          area,
          city,
          address,
          description,
          type,
          price,
          phoneNumber,
        } = req.body;
        if (
          !propertyType ||
          !propertyCondition ||
          !bedrooms ||
          !washrooms ||
          !area ||
          !city ||
          !address ||
          !description ||
          !type ||
          !price ||
          !phoneNumber
        ) {
          return res.status(400).json({
            success: false,
            message: "Please Provide All Required Fields",
          });
        }
        const userId = req.userId;
        const product = await Product.create({
          propertyType,
          propertyCondition,
          bedrooms,
          washrooms,
          area,
          city,
          address,
          description,
          userId,
          type,
          price,
          phoneNumber,
        });
        return res.status(201).json({
            success: true,
            message: "product listed successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.getReviewProduct = async (req, res) => {
    try {
        const product = await Product.find({ type: "review" });
        if (product.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No product Yet" });
        }
        const productCount = product.length;

        return res
            .status(200)
            .json({ success: true, products: product, count: productCount });
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateProductType = async (req, res) => {
    try {
        const { productId, type } = req.body;
        console.log("body is ===>", req.body)

        if (!productId || !type) {
            return res.status(400).json({
                success: false,
                message: "Please provide product ID and type",
            });
        }

        const product = await Product.findOneAndUpdate(
            { _id: productId },
            { type: type },
            { new: true },
            { upsert: true }
        );

        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {
        console.error("Error updating product type:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.getPublishProduct = async (req, res) => {
    try {
        const product = await Product.find({ type: "publish" });
        if (product.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No product Yet" });
        }
        const productCount = product.length;

        return res
            .status(200)
            .json({ success: true, products: product, count: productCount });
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.deleteProduct = async (req, res) => {
  try {
    const productId   = req.params.id;
    console.log("productId is ====>",productId)
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Please provide product ID",
      });
    }

    const product = await Product.findOneAndDelete({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

