const { Product } = require("../models/product");
const multer = require("multer");
const path = require("path");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const Joi = require("joi");
const fs = require("fs");
// const { productSchema } = require("../validator/productValidator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

const addProduct = async (req, res, next) => {
  const { name, price, image } = req.body;
  const newProduct = new Product({
    name,
    price,
    image,
  });

  try {
    const product = await newProduct.save();

    res.json(product);
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};

const updateProduct = async (req, res, next) => {
  handleMultipartData(req, res, async (err) => {
    if (err) {
      return next(CustomErrorHandler.serverError(err.message));
    }
    let filePath;
    if (req.file) {
      filePath = req.file.path;
    }

    //validation

    const { error } = productSchema.validate(req.body);
    if (error) {
      //Delete uploaded image
      if (req.file) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError());
          }
        });
      }

      return next(error);
    }
    const { name, price, size } = req.body;
    let product;
    try {
      product = await Product.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          name,
          size,
          price,
          ...(req.file && { image: filePath }),
        },
        { new: true }
      );
      if (!product) {
        return next(CustomErrorHandler.notFound());
      }

      console.log(product);
    } catch (error) {
      console.log(error);
      return next(error);
    }

    res.status(201).json(product);
  });
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndRemove(req.params.id);
    if (!product) {
      return next(CustomErrorHandler.notFound());
    }

    const imagePath = product.image;

    fs.unlink(`${appRoot}/${imagePath}`, (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError());
      }
      return res.json(product);
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  //pagination use mongoose.pagination
  try {
    const products = await Product.find().select("-updatedAt -__v -createdAt");
    return res.json(products);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).select(
      "-updateAt -__v"
    );
    res.json(product);
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
};
