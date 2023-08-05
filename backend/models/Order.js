const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  product: [
    {
      productId: Schema.Types.ObjectId,
      quantity: Number,
      size: String,
      price: Number,
    },
  ],
  paymentId: {
    type: Number,
    // required: true,
  },
  payment: {
    type: Number,
    // required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "cancel"],
    default: "pending",
  },
});

const Order = model("order", orderSchema);
module.exports = Order;
