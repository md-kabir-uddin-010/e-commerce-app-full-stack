const router = require("express").Router();
const {
  saveOrder,
  getAllOrderByUserID,
} = require("../controllers/orderController");
const orderValidatorMiddleware = require("../middlewares/order/orderValidator");
const accesTokenVarify = require("../middlewares/verifyToken/accesTokenVerify");

router.post("/orders", accesTokenVarify, orderValidatorMiddleware, saveOrder);
router.get("/all/orders", accesTokenVarify, getAllOrderByUserID);

module.exports = router;
