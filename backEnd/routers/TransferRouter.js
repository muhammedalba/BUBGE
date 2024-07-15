const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");




const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");
const { getTransfers, createTransfer, getTransferById,updateTransfer, deletTransfer, uploadTransferImge, createFilteropject } = require("../Controllers/TransferControler");





const router = express.Router({mergeParams:true}); 

router
  .route("/")
  .post(protect,uploadTransferImge,
  resizeImge, createTransfer)
  .get(protect,createFilteropject,getTransfers);
router
  .route("/:id")
  .get( getTransferById)
  .put(protect, allowedTo(role.ADMIN),uploadTransferImge
  , resizeImge, updateTransfer)
  .delete(
    protect,
    allowedTo(role.ADMIN),
   
    deletTransfer
  );
module.exports = router;
