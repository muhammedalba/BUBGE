const mongoose = require("mongoose");
const UserModel = require("./users.module");
const ApiError = require("../utils/apiError");

const TransfersSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "The amount to be transferred is required"],
  },
  Quantitytransferred: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: [true, "The image to be transferred"],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "The user who is transferring"],
  },
  CheckTheTransfer: {
    type: Boolean,
    default: false,
  },
  confirmed: {
    type: Boolean,
    default: true,
  },
});
// // mongoose  query middeware
TransfersSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname email AmountTransferred CheckTheTransfer",
  });

  next();
});

// Middleware to update AmountTransferred before saving
TransfersSchema.pre("save", async function (next) {
  const transfer = this;
  // To start a session,It creates the transaction as one part, and when any error occurs, it cancels the changes without saving
  const session = await mongoose.startSession();
    session.startTransaction();

  try {
     // find the user by id and update their amountTransferred
    const user = await UserModel.findById(transfer.user._id).session(session);
    if(user){
          // If the transfer is not verified, add the amount to the checklist
      if (!transfer.CheckTheTransfer) {
        user.AmountTransferred += transfer.amount;
        transfer.confirmed=false;
       
      } 
      // If the transfer is verified, Add the amount to the user's wallet and vip

      else if (transfer.CheckTheTransfer) {
        user.wallet +=  transfer.amount;
        user.vip +=  transfer.amount;
        transfer.Quantitytransferred =  transfer.amount;
         // Reset the amountTransferred and the transfer status after the transfer
         user.AmountTransferred = 0;
         transfer.amount = 0;
         transfer.CheckTheTransfer = false;
         transfer.confirmed=true;
      }
      await user.save({ session });
    }
    // Save the changes if there are no errors
    await session.commitTransaction();
    session.endSession();

    next();
  } catch (err) {
    // Discard the changes and do not save them 
    await session.abortTransaction();
    session.endSession();

    return next(new ApiError(` no document for the id ${transfer.user}`, 404));
  }
});
// Middleware to update AmountTransferred after removing a transfer
// TransfersSchema.post('remove', async (doc) => {
//   try {
//     const user = await UserModel.findById(doc.user);
//     if (user) {
//       user.AmountTransferred -= doc.amount;
//       await user.save();
//     }
//   } catch (err) {
//     console.error(err);
//   }
// });

module.exports = mongoose.model("Transfer", TransfersSchema);
