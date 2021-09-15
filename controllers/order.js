const Razorpay = require("razorpay");
const shortid = require("shortid");
const razorpay = new Razorpay({
  key_id: "rzp_test_BtdjeqV9ECO0Ea",
  key_secret: "HrRlRWoZ8EWYOZPonV2p8HeQ",
});
const MakeOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const data = {
      amount: (amount - 20) * 100,
      currency: "INR",
      payment_capture: 1,
    };
    const options = await razorpay.orders.create(data);
    res.json({
      status: true,
      message: "order generated successfully ",
      options,
    });
  } catch (error) {
    console.log({ error });
    res.json({
      status: false,
      message: "order generation failed ",
      errorDetail: error.message,
    });
  }
};

module.exports = { MakeOrder };
