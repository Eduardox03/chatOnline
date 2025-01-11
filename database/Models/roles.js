const mongoose=require('mongoose')
const roles=mongoose.Schema({
    name:String,
    status:Boolean    
})

module.exports=roles