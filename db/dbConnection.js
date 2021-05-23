const mongoose = require('mongoose')
async function dbConnection() {
  const URI = process.env['URI']
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log("db connected")
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = { dbConnection }
