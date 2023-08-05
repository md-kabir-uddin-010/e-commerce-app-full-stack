const {
  getProducts,
  getProductById,
} = require("../services/product/publicProductService");
const createError = require("http-errors");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await getProducts();
    res.status(200).json({ message: "products get succesful", info: products });
  } catch (error) {
    next(error);
  }
};
exports.getSingelProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await getProductById(productId);
    res.status(200).json({ message: "product get succesful", info: product });
  } catch (error) {
    next(error);
  }
};
exports.postPayment = async (req, res, next) => {
  try {
    const { name, sku, price, currency, quantity, total_price, description } =
      req.body;
    res.json({ message: "i am payment " });
  } catch (error) {
    next(error);
  }
};
exports.succesPayment = async (req, res, next) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    res.json({ message: "i am succes payment " });
  } catch (error) {
    next(error);
  }
};
exports.canclePayment = async (req, res, next) => {
  try {
    res.json({ message: "i am cancle payment " });
  } catch (error) {
    next(error);
  }
};
