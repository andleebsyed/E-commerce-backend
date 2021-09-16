const mongoose = require('mongoose')
const {Schema} = mongoose
const ProductsSchema =  new Schema({
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
  } ,
    quantity : {
    type : Number ,  
    required : true
  } 
}
)

const Products = mongoose.model('Products' , ProductsSchema , 'products')

module.exports = {Products}
