const { getOrederByUserId } = require("../services/order/orderService");
const sharp = require("sharp");

exports.saveOrder = async (req, res, next) => {
  try {
    const {} = req.body;
    res.status(200).json({ message: "Order complete" });
  } catch (error) {
    next(error);
  }
};
exports.getAllOrderByUserID = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const findOrder = await getOrederByUserId(userId);
    res.status(200).json(findOrder);
  } catch (error) {
    next(error);
  }
};
