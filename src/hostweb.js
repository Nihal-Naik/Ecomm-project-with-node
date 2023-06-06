require('dotenv').config()
const express=require('express')
const path=require('path')
const hbs=require('hbs')
require('./db/conn')
const model=require('./db/models')
const { rmSync } = require('fs')
const app=express()
const cookieParser=require('cookie-parser')
const cart_items=require('./db/cartmodel')
const auth=require('../src/middleware/auth')
const Razorpay=require('razorpay')
// const jwt=require('jsonwebtoken')
const port=process.env.PORT||5000

const staticpath=path.join(__dirname,'../public')
app.use(express.json())
app.use(express.static(staticpath))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.set("view engine","hbs")
const partialspath=path.join(__dirname,'../src/partials')
hbs.registerPartials(partialspath)

let instance = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_SECRET_KEY,
  });

app.get('/index',(req,resp)=>{
    resp.render('index')
})
app.get('/loggeduserpage',auth,async(req,resp)=>{
    resp.render('loggeduserpage')
})
// app.get('/cart',(req,resp)=>{
//     resp.render('cart')
// })

app.get('/canon',auth,async(req,resp)=>{
    resp.render('canon')
})
app.get('/nikon',auth,(req,resp)=>{
    resp.render('nikon')
})
app.get('/sony',(req,resp)=>{
    resp.render('sony')
})
app.get('/coming_soon',(req,resp)=>{
    resp.render('coming_soon')
})
app.get('/canon-3000d-page',(req,resp)=>{
    resp.render('canon-3000d-page')
})
app.get('/canon-1500d-page',(req,resp)=>{
    resp.render('canon-1500d-page')
})

app.get('/nikon-d3000-page',(req,resp)=>{
    
    resp.render('nikon-d3000-page')
})
app.get('/nikon-d3500-page',(req,resp)=>{
    resp.render('nikon-d3500-page')
})
app.get('/Sony-Alpha-ILCE-7RM4A-page',(req,resp)=>{
    resp.render('Sony-Alpha-ILCE-7RM4A-page')
})
app.get('/sony-ICLE-7M2K-page',(req,resp)=>{
    resp.render('sony-ICLE-7M2K-page')
})
app.get('/sign_up',async(req,resp)=>{
    resp.render('sign_up')
})
app.post('/sign_up',async (req,resp)=>{
    try {
        const password=req.body.password
        const cpassword=req.body.cpassword
        if(password===cpassword){
            let data=new model(req.body)
            await data.save()
            resp.render('index')
        }
        else{
            resp.send("The passwords are not same")
        }
    } catch (error) {
        resp.status(400).send(error)
    }
})
app.get('/login',(req,resp)=>{
    resp.render('login')
})
app.post('/login',async(req,resp)=>{
    try {
        const email=req.body.email_l
        const password=req.body.password_l
        const useremail=await model.findOne({email:email})
        
        if(useremail.password===password){
            const token=await useremail.generatetoken()
            resp.cookie("jwt",token,{
                expires:new Date(Date.now()+10000000),httpOnly:true
            })
            
            resp.render('loggeduserpage',{username:useremail.name})
        }else{
            resp.send("login unsuccessfully")
        }
    } catch (error) {
        resp.status(400).send(error)
    }
})

app.post('/createOrder', (req, res)=>{

	// STEP 1:
	const {amount,currency,receipt, notes} = req.body;	
		
	// STEP 2:	
	razorpayInstance.orders.create({amount, currency, receipt, notes},
		(err, order)=>{
		
		//STEP 3 & 4:
		if(!err)
			res.json(order)
		else
			res.send(err);
		}
	)
});
app.listen(port,()=>{
    console.log(`website running at port ${port}`)
})