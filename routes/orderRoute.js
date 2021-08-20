const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { admin } = require("../middlewares/admin");
const {
  getOrders,
  addOrder,
  updateStatus,
  getMyOrders,
  orderDetails,
} = require("../controllers/orderController");

router.get("/", [auth, admin], getOrders);

router.post("/add-order", auth, addOrder);
router.post("/:id", [auth, admin], updateStatus);
router.get("/myorders", auth, getMyOrders);
router.get("/:id", auth, orderDetails);

module.exports = router;
