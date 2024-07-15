const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");




const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");
const { getTransfers, createTransfer, getTransferById,ConfirmTransfer, deletTransfer, uploadTransferImge, createFilteropject } = require("../Controllers/TransferControler");
const { createTransfersValidator, updateTransfersValidator, deletTransfersValidator } = require("../utils/validators/transferValidator");





const router = express.Router({mergeParams:true}); 

router
  .route("/")
  .post(protect,uploadTransferImge,createTransfersValidator,
  resizeImge, createTransfer)
  .get(protect,createFilteropject,getTransfers);
router
  .route("/:id")
  .get( getTransferById)
  .put(protect, allowedTo(role.ADMIN),uploadTransferImge,
  updateTransfersValidator, ConfirmTransfer)
  .delete(
    protect,
    allowedTo(role.ADMIN),
   deletTransfersValidator,
    deletTransfer
  );
module.exports = router;
