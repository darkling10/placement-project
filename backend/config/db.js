const mongoose = require("mongoose")

const conn = mongoose.connect(`${process.env.CONNECTIONURL}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(con=>{
    console.log("Connected to DB")
}).catch(err=>{
    console.log(err)
})


module.exports = conn;


