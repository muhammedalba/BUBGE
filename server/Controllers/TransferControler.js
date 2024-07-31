const { uploadImage } = require("../middleWare/uploadImgeMiddlewRE.JS");
const TransfersModule = require("../models/TransfersModule");

const factory = require("./handelersFactory");


// upload single image
const uploadTransferImge=uploadImage([{name:'image',maxCount:1}])


// nested route
// Get /api/users/:userid/transfer 
const createFilteropject = (req, res, next) => {
  let filteropject = {};
  if (req.params.userid ) {

    // check if admin our user
    if(req.user.role === 'admin'){
          filteropject = { user: req.params.userid};

        req.filteropject = filteropject;
        
    } else{
      filteropject = { user:req.user.id};
  
      req.filteropject = filteropject;
     
    }

     
  }
 
next();
  
};

// get Transfer By User
const userid = (req, res, next) => {
  if (!req.body.user && req.user._id ) {
    const {id} = req.user;
    req.body.user=id


     
  }
 
next();
  
};

//get all getTransfers
//route  get http://localhost:4000/api/Transfers

const getTransfers = factory.getAll(TransfersModule);

// create  category
//route  post http://localhost:4000/api/Transfers
const createTransfer =factory.createOne(TransfersModule)

// get Transfer By Id
//route  get http://localhost:4000/api/Transfers/:id
const getTransferById = factory.getOne(TransfersModule);

// update  Transfer
//route  patch http://localhost:4000/api/Transfers/:id
const ConfirmTransfer = factory.updateOne(TransfersModule);

// delet  Transfer
//route  delet  http://localhost:4000/api/Transfer/:id
const deletTransfer = factory.deleteOne(TransfersModule);
module.exports = {
  createTransfer,
  getTransfers,
  getTransferById,
  ConfirmTransfer,
  deletTransfer,
  createFilteropject,
  userid,
  uploadTransferImge
};
