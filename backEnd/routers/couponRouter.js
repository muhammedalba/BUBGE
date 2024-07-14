const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const { getCoupon, createCoupon, getCouponById, updateCoupon, deletCoupon } = require("../Controllers/coupon.Controler");



const router = express.Router();

router.use(protect, allowedTo(role.ADMIN,role.MANGER));

router
  .route("/")
  .post(createCoupon)
  .get(getCoupon);
router
  .route("/:id")
  .get( getCouponById)
  .put( updateCoupon)
  .delete( deletCoupon);
module.exports = router;
