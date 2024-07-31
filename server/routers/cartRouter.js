const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const {
  addProductToCart,
  getCart,
  removeCartItem,
  clearCart,

} = require("../Controllers/cartControler");

const router = express.Router();
router.use(protect, allowedTo(role.USER, role.ADMIN));
router.route("/").post(addProductToCart).get(getCart).delete(clearCart);

  
router.route("/:itemid")

.delete(removeCartItem);

module.exports = router;
