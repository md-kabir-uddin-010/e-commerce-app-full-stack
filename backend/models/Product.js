const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    reguler_price: {
      type: Number,
      required: true,
    },
    sale_price: {
      type: Number,
      required: true,
    },
    images: [{ url: String, featured: Boolean }],
    avilable_sizes: {
      type: Array,
      required: true,
    },
    currency_format: {
      type: String,
      default: "$",
    },
    free_shiping: {
      type: Boolean,
      default: false,
    },
    publish: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = model("product", productSchema);
module.exports = Product;
