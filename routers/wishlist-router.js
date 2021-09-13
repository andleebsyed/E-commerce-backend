const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { User } = require("../models/user-model");
const WishlistRouter = express.Router();
const { Wishlist } = require("../models/wishlist-model");

WishlistRouter.get("/", async (req, res) => {
  // get all
  try {
    const myWishlist = await Wishlist.find({});
    res.json({ myWishlist: myWishlist });
  } catch (error) {
    res.json({ status: false, message: "failed", errMessage: error.message });
  }
});
WishlistRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    user.wishlist.push(productId);
    const response = await user.save();

    res.json({
      status: true,
      response,
      message: "added to wishlist successfully",
    });
  } catch (error) {
    res.json({
      status: false,
      message: "sorry couldn't add the product",
      errMessage: error.message,
    });
  }
});

WishlistRouter.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    await Wishlist.remove({ _id: id });
    res.json({ staus: true, message: "deleted successfully" });
  } catch (error) {
    res.json({
      status: false,
      message: "something wrong happened",
      errorMessaage: error.message,
    });
  }
});

module.exports = { WishlistRouter };
