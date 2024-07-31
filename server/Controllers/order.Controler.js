const asyncHandler = require("express-async-handler");
const factory = require("./handelersFactory");
const ApiError = require("../utils/apiError");
const cartModel = require("../models/cartModel");
const orderModul = require("../models/orderModel");
const UserModel = require("../models/users.module");

//post  create cash order
// /api/orders/:cartId
exports.createcashOrder = asyncHandler(async (req, res, next) => {
  // app settings
  const shippingPrice = 0;
  const taxtPrice = 0;
  
  // 1- get cart depend on cardid 
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError(`cart not found id${req.params.cartId}`, 404));
  }

  // 2- get order depend on price "chek if coupon applay"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;
  const totalOrderPrice = cartPrice + taxtPrice + shippingPrice;
// تاكد من وجود اموال كافيه في المحفظة
  if (req.user.wallet < cart.totalCartPrice) {
    return next(new ApiError("Not enough money in wallet", 400));
  }

  // 3- create order with default paymentMethod cash

  const order = await orderModul.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    // shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  // 4_ after creating order,increment product sold,decrement product quantity
  if (order) {
    const bulkoptions =[ {updateOne: {
        filter: { _id: req.user._id },
        update: { $inc: { wallet: -cart.totalCartPrice } },
      },}]
  
    console.log(bulkoptions);
    //  تقوم بعمل اكثر من اوبريشن في كوماند واحد
    await UserModel.bulkWrite(bulkoptions,{});
    // 5-clear cart depend on cardid
    await cartModel.findByIdAndDelete(req.params.cartId);
  }
  res.status(201).json({ message: "success", data: order });
});

// Display orders based on user (all orders our  user order)
exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filteropject = { user: req.user._id };
  next();
});

//  get  get all orders
// /api/orders
exports.getAllOrders = factory.getAll(orderModul);




//  get  get all orders
// /api/orders/:id
exports.findSpecificOrder = factory.getOne(orderModul);

// put update order paid status to paid
// /api/orders/:id/pay
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await orderModul.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(`there is such a order with id : ${req.params.id}`, 404)
    );
  }
  // update order to paid
  order.isPaid = true;
  order.paidAt = Date.now();

  const updateOrder = await order.save();

  res.status(200).json({ data: updateOrder });
});

// put update order delivered status to paid
// /api/orders/:id/deliver
exports.updateOrderTodelivered = asyncHandler(async (req, res, next) => {
  const order = await orderModul.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(`there is such a order with id : ${req.params.id}`, 404)
    );
  }
  // update order to paid
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updateOrder = await order.save();

  res.status(200).json({ data: updateOrder });
});

// get checkout session from stripe and send it as response
// /api/orders/checkout-session/cartId
exports.checkoutSession = asyncHandler(async (req, res, next) => {
  // app settings
  const shippingPrice = 0;
  const taxtPrice = 0;

  // 1- get cart depend on cardid
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) {
  
    return next(new ApiError(`cart not found id${req.params.cartId}`, 404));
  }

  // 2- get order depend on price "chek if coupon applay"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;
  const totalOrderPrice = cartPrice + taxtPrice + shippingPrice;

  //3-  create stripe chekout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: { 
         
          currency: 'sar',  
          unit_amount: totalOrderPrice * 100 ,// ( 0.1 => 10)
        product_data: {
          name: req.user.firstname,
          
          // images: ['https://example.com/t-shirt.png'],
         
        },
        } ,


        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get('host')}/api/orders`,
    cancel_url: `${req.protocol}://${req.get('host')}/api/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  res.status(200).json({ data: session });
});



