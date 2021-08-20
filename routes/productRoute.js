const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController");
const { auth } = require("../middlewares/auth");
const { admin } = require("../middlewares/admin");

const router = express.Router();

router.post("/add-product", [auth, admin], addProduct);
router.put("/update-product/:id", [auth, admin], updateProduct);
router.delete("/delete-product/:id", [auth, admin], deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
