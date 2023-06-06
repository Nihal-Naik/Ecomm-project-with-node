const { response } = require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Schema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },        
        password:{
            type:String,
            required:true
        },
        cpassword:{
            type:String,
            required:true
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }]
    }
)
Schema.methods.generatetoken=async function(){
    try {
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (error) {
        response.status(400).send(error)
    }
}
module.exports=mongoose.model('usercreds',Schema)