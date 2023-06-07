let sliding_img=document.getElementsByClassName("sliding-img")
let next_arrow=document.getElementById("next-arrow")
let prev_arrow=document.getElementById("prev-arrow")


let countanime=0


const animate_x=setInterval(animate,3000)



next_arrow.addEventListener('click',function() {
    sliding_img[countanime].style.animation="next1 0.5s ease-in forwards"
    if(countanime>=sliding_img.length-1){
        countanime=0
    }
    else{
        countanime++
    }
    sliding_img[countanime].style.animation="next2 0.5s ease-in forwards"
})
prev_arrow.addEventListener('click',function() {
    sliding_img[countanime].style.animation="prev1 0.5s ease-in forwards"
    if(countanime==0){
        countanime=sliding_img.length-1
    }
    else{
        countanime--
    }
    sliding_img[countanime].style.animation="prev2 0.5s ease-in forwards"
})

function animate(){
    sliding_img[countanime].style.animation="next1 0.5s ease-in forwards"
    if(countanime>=sliding_img.length-1){
        countanime=0
    }
    else{
        countanime++
    }
    sliding_img[countanime].style.animation="next2 0.5s ease-in forwards"
}
