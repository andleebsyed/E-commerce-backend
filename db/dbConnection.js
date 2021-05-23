const mongoose = require('mongoose')

function dbConnection(){
mongoose.connect('mongodb+srv://andleebsyed:andydev%40123@neog-cluster.4e6nl.mongodb.net/inventory' ,  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
.then(() => console.log("db connected"))
.catch(error => console.log(error.message))
}

module.exports = {dbConnection}
