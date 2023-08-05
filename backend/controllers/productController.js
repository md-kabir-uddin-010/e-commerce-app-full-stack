const {
  createProduct,
  getAllProducts,
  findProductById,
  deleteImageById,
  deleteProduct,
  updateProductById,
  featuredImageUpdate,
} = require("../services/product/productService");
const createError = require("http-errors");

//create new product
exports.uploadProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      reguler_price,
      sale_price,
      currency_format,
      free_shiping,
      avilable_sizes,
    } = req.body;

    const images = [];
    if (req.files.length > 0) {
      req.files.forEach((file) => {
        images.push({
          url: file.filename,
          featured: false,
        });
      });
    }

    let productObject = {
      title,
      description,
      reguler_price,
      sale_price,
      images,
      avilable_sizes: JSON.parse(avilable_sizes),
      currency_format,
      free_shiping,
    };

    const save = await createProduct(productObject);
    res.status(200).json({ message: "product create succesful", info: save });
  } catch (error) {
    next(error);
  }
};
// update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      title,
      description,
      reguler_price,
      sale_price,
      currency_format,
      free_shiping,
      avilable_sizes,
      publish,
    } = req.body;

    const images = [];
    if (req.files.length > 0) {
      req.files.forEach((file) => {
        images.push({
          url: file.filename,
          featured: false,
        });
      });
    }

    let productObject = {
      title,
      description,
      reguler_price,
      sale_price,
      images,
      avilable_sizes: JSON.parse(avilable_sizes),
      currency_format,
      free_shiping,
      publish,
    };

    const save = await updateProductById(productId, productObject);
    res.status(200).json({ message: "product update succesful", info: save });
  } catch (error) {
    next(error);
  }
};

//get products
exports.getProducts = async (req, res, next) => {
  try {
    const allPublishProduct = await getAllProducts();
    res.status(200).send(allPublishProduct);
  } catch (error) {
    next(error);
  }
};
//get  product by Id
exports.getSingleProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await findProductById(productId);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};
//delete product image
exports.deleteProductImage = async (req, res, next) => {
  try {
    const { productId, imageId } = req.params;
    const updataProduct = await deleteImageById(productId, imageId);
    res
      .status(200)
      .json({ message: "Image delete successful", info: updataProduct });
  } catch (error) {
    next(error);
  }
};

//delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await deleteProduct(productId);
    res.status(200).json({ message: "product delete succesful" });
  } catch (error) {
    next(error);
  }
};
//update product image
exports.updateProductImage = async (req, res, next) => {
  try {
    const { productId, imageId } = req.params;
    const updated = await featuredImageUpdate(productId, imageId);
    res
      .status(200)
      .json({ message: "featured image update succesful", info: updated });
  } catch (error) {
    next(error);
  }
};
