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


app.use((req, res) => 
{ res.status(404).json({ success: false, message: "route not found on server, please check"}) })

app.use((err, req, res, next) => { console.error(err.stack); res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message}) })

app.listen(3000 , () => console.log("Express up and running...."))