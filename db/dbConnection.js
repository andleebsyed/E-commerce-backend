const mongoose = require('mongoose')
function dbConnection(){
  const URI = process.env['URI']
mongoose.connect(URI ,  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
.then(() => console.log("db connected"))
.catch(error => console.log(error.message))
}

module.exports = {dbConnection}
