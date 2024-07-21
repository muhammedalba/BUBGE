const mongoose = require("mongoose");

const catrSchema = new mongoose.Schema({
cartItems:[{
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
       
        default: 1,
    },
    Playerid:{type :String},
    price: {type:Number}
}],
user:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
},
 totalCartPrice:{
    type: Number,
    
    default: 0,
 },
 totalPriceAfterDiscount:{
    type: Number,
    
    default: 0,
 }



}, { timestamps: true });
catrSchema.pre(/^find/, function (next) {
    this.populate({
      path: "cartItems.product",
      select: "title  price priceAfterDiscount description  imageCover images",
    });
  
    next();
  });
const cartModel=mongoose.model("Cart", catrSchema);
module.exports =cartModel;
