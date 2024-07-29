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
        Playerid: { type: String },
        price: { type: Number },
       
      },
    ],

   
    totalOrderPrice: { type: Number },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname image phone email wallet",
  }).populate({
    path: "cartItems.product",
    select: "title price imageCover ",
  });

  next();
});
const orderModul = mongoose.model("Order", orderSchema);
module.exports = orderModul;
