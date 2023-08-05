const { orderValidator } = require("../../utils/order/orderValidator");

const orderValidatorMiddleware = async (req, res, next) => {
  try {
    const result = await orderValidator.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports = orderValidatorMiddleware;
