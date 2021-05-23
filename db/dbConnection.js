const mongoose = require('mongoose')
// mongodb+srv://andleebsyed:andydev%40123@neog-cluster.4e6nl.mongodb.net/inventory
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
