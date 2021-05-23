const express = require('express')
const WishlistRouter = express.Router();
const {Wishlist} = require('../models/wishlist-model')

WishlistRouter.route('/')
.get(async (req,  res) =>{
  // get all
  try{
    const myWishlist = await Wishlist.find({})
    res.json({myWishlist : myWishlist })
  }
  catch(error){
    res.json({status : false , message : "failed" , errMessage : error.message})
  }

})
.post(async (req  , res) => {
  try{
    const data = req.body
    const NewProduct = new Wishlist(data)
    const SavedProduct =await  NewProduct.save()
    res.json({SavedProduct : SavedProduct})
  }catch(error){ res.status(500).json({status : false  ,
  message : "sorry couldn't add the product" , errMessage : error.message })}
})

WishlistRouter.route('/:id')
.delete(async (req, res) =>{
  const {id} = req.params
  try{
      await Wishlist.remove({_id : id})
      res.json({staus : true , message : 'deleted successfully'})
  }catch(error) {
    res.json({status : false , message : "something wrong happened" , errorMessaage : error.message})
  }
})

module.exports = {WishlistRouter};

