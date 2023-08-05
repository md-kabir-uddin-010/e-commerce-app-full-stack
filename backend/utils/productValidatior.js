const Joi = require("joi");

const newProduct = Joi.object({
  title: Joi.string().trim().min(5).max(100).required(),
  description: Joi.string().trim().min(5).max(500).required(),
  reguler_price: Joi.number().required(),
  sale_price: Joi.number().required(),
  avilable_sizes: Joi.string().required(),
  currency_format: Joi.string().required(),
  free_shiping: Joi.boolean().required(),
});
const updateProduct = Joi.object({
  title: Joi.string().trim().min(5).max(100).required(),
  description: Joi.string().trim().min(5).max(500).required(),
  reguler_price: Joi.number().required(),
  sale_price: Joi.number().required(),
  avilable_sizes: Joi.string().required(),
  currency_format: Joi.string().required(),
  free_shiping: Joi.boolean().required(),
  publish: Joi.boolean().required(),
});

module.exports = {
  newProduct,
  updateProduct,
};
