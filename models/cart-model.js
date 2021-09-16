const mongoose = require('mongoose')
const {Schema} = mongoose
const CartSchema = new Schema({
   img: 
      { data: Buffer, contentType: String }
  , 
  name : {
    type : String , 
    required : true
  } , 
  description : {
    type : String ,
    required : true
  }
    , 
  price : {
    type : Number ,  
    required : true
  } , 
   
  inStock : {
    type : Boolean ,  
    required : true
  } , 
  fastDelivery : {
    type : Boolean ,  
    required : true
  }  ,
    quantity : {
    type : Number ,  
    required : true
  } 
})

const Cart = mongoose.model('Cart'  , CartSchema , 'cart')

module.exports = {Cart}