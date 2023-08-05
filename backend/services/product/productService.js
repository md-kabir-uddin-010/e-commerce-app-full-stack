const createError = require("http-errors");
const Product = require("../../models/Product");
const { unlink } = require("fs");
const path = require("path");

const createProduct = async (obj) => {
  try {
    const product = new Product(obj);
    const save = await product.save();
    return save;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
const updateProductById = async (productId, obj) => {
  try {
    const findProduct = await findProductById(productId);
    if (!findProduct) throw createError.NotFound("invalid product id!");
    const updatedData = {
      title: obj.title,
      description: obj.description,
      reguler_price: obj.reguler_price,
      sale_price: obj.sale_price,
      images: findProduct.images.concat(obj.images),
      avilable_sizes: obj.avilable_sizes,
      currency_format: obj.currency_format,
      free_shiping: obj.free_shiping,
      publish: obj.publish,
    };

    const update = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true,
    });
    return update;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
const findProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const deleteImageById = async (productId, imageId) => {
  try {
    const findProduct = await findProductById(productId);
    if (!findProduct) throw createError.NotFound("Invalid product id!");
    const imageIdExist = findProduct.images.find((img) => {
      return String(img._id) === imageId;
    });
    if (!imageIdExist) throw createError.NotFound("Invalid image id!");

    findProduct.images.find((image) => {
      if (String(image._id) === imageId) {
        unlink(
          path.join(`${__dirname}/../../public/products/${image.url}`),
          (err) => {
            if (err) throw createError.InternalServerError();
          }
        );
      }
    });
    const filterImages = findProduct.images.filter((image) => {
      if (String(image._id) !== imageId) return image;
    });

    const updateProducts = await Product.findByIdAndUpdate(
      productId,
      { images: filterImages },
      { new: true }
    );
    return updateProducts;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const deleteProduct = async (productId) => {
  try {
    const findProduct = await findProductById(productId);
    if (!findProduct) throw createError.NotFound();
    findProduct.images.find((image) => {
      if (image.url) {
        unlink(
          path.join(`${__dirname}/../../public/products/${image.url}`),
          (err) => {
            if (err) throw createError.InternalServerError();
          }
        );
      }
    });
    const deleted = await Product.findByIdAndRemove(productId);
    return deleted;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//featured image
const featuredImageUpdate = async (productId, imageId) => {
  try {
    const findProduct = await Product.findById(productId);
    if (!findProduct) throw createError.NotFound("Invalid product id!");
    let newImagesArr = [];
    findProduct.images.forEach((image) => {
      if (String(image._id) === imageId) {
        newImagesArr.push({
          _id: image._id,
          url: image.url,
          featured: true,
        });
      } else {
        newImagesArr.push({
          _id: image._id,
          url: image.url,
          featured: false,
        });
      }
    });
    const updated = await Product.findByIdAndUpdate(
      productId,
      { images: newImagesArr },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
  deleteImageById,
  deleteProduct,
  updateProductById,
  featuredImageUpdate,
};
