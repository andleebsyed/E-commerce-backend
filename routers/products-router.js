const express = require('express')
const ProductsRouter = express.Router();
const {Products} = require('../models/products-model')


ProductsRouter.route('/')
.get(async (req,  res) =>{
  // get all
  try{
    
    const myData = await Products.find({})
    res.json({myData : myData })
  }
  catch(error){
    res.json({status : false , message : "failed" , errMessage : error.message})
  }

})
.post(async (req  , res) => {
  try{
    const data = req.body
    const NewProduct = new Products(data)
    const SavedProduct =await  NewProduct.save()
    res.json({status : true  , SavedProduct})
  }catch(error){ res.status(500).json({status : false  ,
  message : "sorry couldn't add the product" , errMessage : error.message })}
})

module.exports = {ProductsRouter};

