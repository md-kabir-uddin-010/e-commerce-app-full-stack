const Joi = require("joi");

const productObj = {
  productId: Joi.string().required(),
  quanntity: Joi.number().required(),
  size: Joi.string().required(),
};

const orderValidator = Joi.object({
  userId: Joi.string().min(24).hex().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  size: Joi.string().required(),
  paymentId: Joi.number(),
  payment: Joi.number(),
  total_price: Joi.number().required(),
});

module.exports = {
  orderValidator,
};
