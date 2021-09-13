const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());
const { ProductsRouter } = require("./routers/products-router");
const { WishlistRouter } = require("./routers/wishlist-router");
const { CartRouter } = require("./routers/cart-router");
const { dbConnection } = require("./db/dbConnection");
const { UserRouter } = require("./routers/user-router");

// initiate db dbConnection
dbConnection();
app.get("/", (req, res) => {
  res.send("hello from home");
});

app.use("/products", ProductsRouter);
app.use("/wishlist", WishlistRouter);
app.use("/cart", CartRouter);
app.use("/user", UserRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the errorMessage key for more details",
    errorMessage: err.message,
  });
});

app.listen(9000, () => console.log("Express up and running...."));
