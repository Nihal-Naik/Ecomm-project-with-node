let sliding_img=document.getElementsByClassName("sliding-img")
let next_arrow=document.getElementById("next-arrow")
let prev_arrow=document.getElementById("prev-arrow")


let count=0


const animate_x=setInterval(animate,3000)



next_arrow.addEventListener('click',function() {
    sliding_img[count].style.animation="next1 0.5s ease-in forwards"
    if(count>=sliding_img.length-1){
        count=0
    }
    else{
        count++
    }
    sliding_img[count].style.animation="next2 0.5s ease-in forwards"
})
prev_arrow.addEventListener('click',function() {
    sliding_img[count].style.animation="prev1 0.5s ease-in forwards"
    if(count==0){
        count=sliding_img.length-1
    }
    else{
        count--
    }
    sliding_img[count].style.animation="prev2 0.5s ease-in forwards"
})

function animate(){
    sliding_img[count].style.animation="next1 0.5s ease-in forwards"
    if(count>=sliding_img.length-1){
        count=0
    }
    else{
        count++
    }
    sliding_img[count].style.animation="next2 0.5s ease-in forwards"
}
