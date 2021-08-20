const { APP_URL } = require("../config");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema, "products");
module.exports = { Product };
