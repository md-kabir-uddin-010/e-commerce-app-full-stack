const router = require("express").Router();
const {
  uploadProduct,
  getProducts,
  getSingleProductById,
  deleteProductImage,
  updateProductImage,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const adminValidator = require("../middlewares/admin/adminValidator");
const productValidator = require("../middlewares/product/productValidator");
const productUploader = require("../middlewares/uploader/productUploader");
const imageIdValidtor = require("../middlewares/validator/imageIdValidator");
const IdValidtor = require("../middlewares/validator/IdValidator");
const accesTokenVarify = require("../middlewares/verifyToken/accesTokenVerify");
const updateProductValidator = require("../middlewares/product/updateProductValidator");

router.post(
  "/upload",
  accesTokenVarify,
  adminValidator,
  productUploader,
  productValidator,
  uploadProduct
);
router.get("/all", accesTokenVarify, adminValidator, getProducts);
router.get(
  "/:productId",
  accesTokenVarify,
  adminValidator,
  IdValidtor,
  getSingleProductById
);
router.put(
  "/:productId/image/update/featured/:imageId",
  accesTokenVarify,
  adminValidator,
  IdValidtor,
  imageIdValidtor,
  updateProductImage
);
router.put(
  "/update/:productId",
  accesTokenVarify,
  adminValidator,
  IdValidtor,
  productUploader,
  updateProductValidator,
  updateProduct
);
router.delete(
  "/:productId/image/delete/:imageId",
  accesTokenVarify,
  adminValidator,
  IdValidtor,
  imageIdValidtor,
  deleteProductImage
);

router.delete(
  "/delete/:productId",
  accesTokenVarify,
  adminValidator,
  IdValidtor,
  deleteProduct
);

module.exports = router;
