const {
  getAllProducts,
  getSingelProductById,
  postPayment,
  succesPayment,
  canclePayment,
} = require("../controllers/publicProduct");
const idValidtor = require("../middlewares/validator/IdValidator");

const router = require("express").Router();

router.get("/public/all/products", getAllProducts);
router.get("/public/product/:productId", idValidtor, getSingelProductById);

router.post("/pay", postPayment);
router.get("/success", succesPayment);
router.get("/cancel", canclePayment);
module.exports = router;
