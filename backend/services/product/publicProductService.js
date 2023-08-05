const createError = require("http-errors");
const Product = require("../../models/Product");

const getProducts = async () => {
  try {
    const products = await Product.find({ publish: true });
    return products;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  getProducts,
  getProductById,
};
