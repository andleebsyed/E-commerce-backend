const mongoose = require("mongoose");
require("dotenv").config();
async function dbConnection() {
  // const URI = ;
  try {
    await mongoose.connect(process.env.URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { dbConnection };
