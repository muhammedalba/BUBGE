const { check } = require("express-validator");


const validatorMiddleware = require("../../middleWare/validatorMiddleware");

const UserModel = require("../../models/users.module");
const TransfersModule = require("../../models/TransfersModule");

exports.getTransfersValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id Format"),
  validatorMiddleware,
];

exports.createTransfersValidator = [
  check("amount")
    .notEmpty()
    .withMessage("amount required")
    .isNumeric()
    .withMessage("amount must be a number")
    .isLength({ max: 32 })
    .withMessage("to long amount ")
    .custom((valeu) => {
      if (valeu <= 0) {
        return Promise.reject(
          new Error("The amount must be greater than zero")
        );
      }
      return true;
    }),
    check('image').custom((value, { req }) => {
        if (!req.files) {
          throw new Error('Image is required');
        }
        return true;
      })
    ,

  check("user")
    .notEmpty()
    .withMessage("user is required")
    .isMongoId()
    .withMessage("invalid id formate")
    .custom((userid) =>
        UserModel.findById(userid).then((user) => {
        if (!user) {
            return Promise.reject(
            new Error(`no user for this id ${userid}`)
            );
        }
        if(user && user.AmountTransferred >0){
          return Promise.reject(
            new Error(`There is an amount already transferred that has not been confirmed`)
          );
        }
  
        })
    ),




  validatorMiddleware,
];
exports.updateTransfersValidator = [
  check("id").isMongoId().withMessage("Invalid transfer id Format"),
  check("CheckTheTransfer")
  .isBoolean().withMessage("CheckTheTransfer is not a valid")
  .custom(async(val,{req})=>{
    if(val){
        // Make sure there is a process
        const transfer =await TransfersModule.findById(req.params.id);
        if(transfer){
            //The transfer of the amount to the wallet has already been confirmed
            if(transfer.confirmed){
                return Promise.reject(
                    new Error(`The transfer has been confirmed ${req.params.id}`)
                );
            }
            // The transfer has not been confirmed
            return true;
        }
        // No transfer found  for this id  in the database
        return Promise.reject(new Error(`no transfer for this id ${req.params.id}`));
            
    }
  })
  ,



  validatorMiddleware,
];
exports.deletTransfersValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id Format")
  .custom(async(val,{req})=>{
    if(val){
        // Make sure there is a process
        const transfer =await TransfersModule.findById(req.params.id);
        if(transfer){
            // Make sure the amount is transferred to the wallet 
            if(transfer.confirmed){
                return true;
             
            }
            // The amount has not been transferred to the wallet yet
            return Promise.reject(
                new Error(`The amount has not been transferred to the wallet yet ${req.params.id}`)
            );
        }
        // No transfer found  for this id  in the database
        return Promise.reject(new Error(`no transfer for this id ${req.params.id}`));
            
    }
  }),
  validatorMiddleware,
];
