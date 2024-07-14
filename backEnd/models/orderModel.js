const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "order must be user"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
        color: { type: String },
        price: { type: Number },
      },
    ],
    taxtPrice: {
      type: Number,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      detalis: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    totalOrderPrice: { type: Number },
    paymentMethodType: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname image phone email",
  }).populate({
    path: "cartItems.product",
    select: "title price imageCover",
  });

  next();
});
const orderModul = mongoose.model("Order", orderSchema);
module.exports = orderModul;
