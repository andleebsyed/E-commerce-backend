const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json({limit : '5000kb'}))
const {ProductsRouter} = require('./routers/products-router')
const {WishlistRouter} = require('./routers/wishlist-router')
const {CartRouter} = require('./routers/cart-router')
// check
const {dbConnection} = require('./db/dbConnection')

// initiate db dbConnection
dbConnection();
app.get('/' , (req , res) =>{
  res.send("hello from home")
})

app.use('/products' , ProductsRouter)
app.use('/wishlist' , WishlistRouter)
app.use('/cart' , CartRouter)

app.listen(3000 , () => console.log("Express up and running...."))