const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { Cart } = require("../models/cart-model");
const { User } = require("../models/user-model");
const CartRouter = express.Router();
CartRouter.route("/")
  .get(async (req, res) => {
    try {
      const myCart = await Cart.find({});
      res.json({ myCart: myCart });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "couldn't collect the data",
        errorMessaage: error.message,
      });
    }
  })
  .post(verifyToken, async (req, res) => {
    try {
      const { productId, userId } = req.body;
      const user = await User.findById(userId);
      user.cart.push({ product: productId, quantity: 1 });
      // const newProduct = new Cart(data)
      // const SavedData = await newProduct.save()
      const response = await user
        .save()
        .then((t) => t.populate("wishlist,  cart.product").execPopulate());
      response.password = undefined;
      response.__v = undefined;
      res.json({
        status: true,
        message: "profduct saved to cart successfully",
        response,
      });
    } catch (error) {
      res.json({
        status: false,
        message: "Failed to update the cart'",
        errorMessaage: error.message,
      });
    }
  })

  .put(verifyToken, async (req, res) => {
    const { wholeProductId, userId } = req.body;
    const paramCase = req.params("case");
    const user = await User.findById(userId);
    const productToUpdateIndex = user.cart.findIndex((product) =>
      product._id.equals(wholeProductId)
    );
    // for increment
    if (paramCase === "inc") {
      console.log("incc detected");
      try {
        user.cart[productToUpdateIndex].quantity =
          user.cart[productToUpdateIndex].quantity + 1;
        await user.save();
        res.json({
          status: true,
          message: "updated quantity successfully(inc)",
        });
      } catch (error) {
        res.json({ message: "failed", errMessage: error.message });
      }
    }

    //for decrement
    else {
      try {
        user.cart[productToUpdateIndex].quantity =
          user.cart[productToUpdateIndex].quantity - 1;
        await user.save();
        res.json({
          status: true,
          message: "updated quantity successfully(dec)",
        });
      } catch (error) {
        res.json({ message: "failed", errMessage: error.message });
      }
    }
  });

CartRouter.route("/:productId").delete(verifyToken, async (req, res) => {
  const { productId } = req.params;
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.cart = user.cart.filter(
      (singleProduct) => !singleProduct.product.equals(productId)
    );
    await user.save();
    res.json({ staus: true, message: "deleted successfully" });
  } catch (error) {
    res.json({
      status: false,
      message: "something wrong happened",
      errorMessaage: error.message,
    });
  }
});

CartRouter.post("/emptycart", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.cart = [];
    const response = await user.save();
    res.json({ status: true, message: "cart emptied successfully" });
  } catch (error) {
    res.json({
      status: false,
      message: "failed to empty the cart",
      errorDetail: error.message,
    });
  }
});

module.exports = { CartRouter };
