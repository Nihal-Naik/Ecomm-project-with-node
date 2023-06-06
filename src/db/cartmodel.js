const mongoose=require('mongoose')
const prodSchema=mongoose.Schema(
    {
        prodid:{
            type:Number
        },
        prodname:{
            type:String
        },
        prodprice:{
            type:Number
        }
    }
)
module.exports=mongoose.model('productdetails',prodSchema)