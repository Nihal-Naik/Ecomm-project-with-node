const jwt=require('jsonwebtoken')
const model=require('../db/models')


const auth=async(req,resp,next)=>{
    try {
        const token=req.cookies.jwt
        const verifyuser=jwt.verify(token,process.env.SECRET_KEY)
        const userdata=await model.findOne(
            {_id:verifyuser._id}
        )
        next()
    } catch (error) {
        resp.status(401).send(error)
    }
}
module.exports=auth