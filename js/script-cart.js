// // // require('/Users/Nihal/Desktop/Ecom Mini Project/src/db/conn')
// // const mongoose=require('mongoose')
// // // const cartmodel = require('../../src/db/cartmodel')
// // mongoose.connect("mongodb://127.0.0.1:27017/Ecom")
// // // const cartmodel = require('../../src/db/cartmodel')
// // const prodSchema=new mongoose.Schema(
// //     {
// //         prodid:{
// //             type:Number
// //         },
// //         prodname:{
// //             type:String
// //         },
// //         prodprice:{
// //             type:Number
// //         }
// //     }
// // )

// // const getd=async()=>{
// //     let product=mongoose.model('productdetails',prodSchema)
// //     let result=await product.findOne({prodid:"0"})
// //     console.log(result.prodname)
// // }
// // getd()

let cart_item=document.querySelector('.cart_item')

let count_cart=0
let cart_button=document.getElementById("cart-button")
cart_button.addEventListener("click",function() {
    count_cart=count_cart+1
    if(count_cart%2==0){
        cart_item.style.visibility="hidden"
    }
    else{
        cart_item.style.visibility="visible"
    }
})
let product=[
    {
        id:0,
        img:"./images/canon-3000d-canon-layout.jpg",
        name:"Canon EOS 3000D DSLR Camera 1 Camera Body, 18 - 55 mm Lens  (Black)#JustHere",
        price:25000
    },
    {
        id:1,
        img:"./images/canon-1500d-canon-layout.jpg",
        name:"Canon EOS 1500D DSLR Camera 1 Camera Body, 18 - 55 mm Lens  (Black)#JustHere",
        price:36999
    },
    {
        id:2,
        img:"./images/nikon D3000.jpg",
        name:"Nikon D3000 DSLR Camera 1 Camera Body, 18 - 55 mm Lens",
        price:45000
    },
    {
        id:3,
        img:"./images/nikon D3500.jpg",
        name:"Nikon D3500 DSLR Camera 1 Camera Body, 18 - 55 mm ",
        price:65000
    },
    {
        id:4,
        img:"./images/Sony Alpha ILCE-7RM4A.jpg",
        name:"Sony Alpha ILCE-7RM4A Full-Frame 61.0MP Mirrorless Digital SLR Camera Body ",
        price:50000
    },
    {
        id:5,
        img:"./images/Sony ILCE 7M2K.jpg",
        name:"SONY Alpha Full Frame ILCE-7M2K/BQ IN5 Mirrorless Camera Body with 28 - 70 mm Lens  ",
        price:56000
    }
]
// let count=0
let numofitems=document.getElementById('numofitems')
let cart=JSON.parse(localStorage.getItem("CART"))
let count=JSON.parse(localStorage.getItem("COUNT"))
numofitems.textContent=count
// let cart=[]

updatecart()
function add_to_cart(id){
   
    if(cart.some((item) => item.id===id)){
        alert("Product alreadt exists")
    }else{
        const item=product.find((product)=>product.id===id)
        cart.push(item)
        // console.log(cart)
        numberofitems()
    }

    updatecart()
}
// // async function add_to_cart(id){
// //     let product_details=mongoose.model('productdetails',prodSchema)
// //     let result=await product_details.findOne({prodid:id})
// //     cart.push(result)
// //     updatecart()
// // }
function updatecart(){
    rendercartitems()
    localStorage.setItem("CART",JSON.stringify(cart))
}
function rendercartitems(){
    cart_item.innerHTML=""
    cart.forEach((item)=>{
        cart_item.innerHTML+=`
            <div class="items_in_cart">
                <div class="left_side">
                    <img src="${item.img}" alt="">
                </div>
                <div class="right_side">
                    <p>${item.name}</p>
                    <P>&#8377;${item.price} </P>
                </div>
                <div class="removebutton">
                    <button onclick="removeitem(${item.id})">Remove</button>
                </div>
            </div>
        `
        // console.log(4)
    })
    
}
function removeitem(id){
   cart= cart.filter((item)=>item.id!==id)
   updatecart()
   numberofitems()
}
function numberofitems(){
    let count=0
    cart.forEach((item)=>{
        count++
        localStorage.setItem("COUNT",JSON.stringify(count))
        numofitems.textContent=count
    })
    count=0
}
//Payment gateway


// console.log(Buy_now.value)
document.getElementById('Buy_now').onclick = function (e) {
    
    
    let item=product.find((product)=>product.id==Buy_now.value)
    let price=item.price*100
    var options = {
        key: "rzp_test_3c1P5kupAcp24Z",
        amount: `${price}`,
        currency: "INR",
        name: `${item.name}`,
        description: "Pay & Checkout this Course, Upgrade your DSA Skill",

        handler: function (response) {
            console.log(response);
            alert("This step of Payment Succeeded");
        },
        prefill: {
    //Here we are prefilling random contact
            contact: "9876543210",
    //name and email id, so while checkout
            name: "Twinkle Sharma",
            email: "smtwinkle@gmail.com",
        },
        notes: {
         description: "Best Camera for casual Photography",
        },
        theme: {
            color: "#2300a3",
        },
    };
    let razorpayObject = new Razorpay(options);
    console.log(razorpayObject);
    razorpayObject.on("payment.failed", function (response) {
    console.log(response);
    alert("This step of Payment Failed");
    });
    razorpayObject.open();
    e.preventDefault();
}