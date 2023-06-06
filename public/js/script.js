let ham_menu=document.getElementById("ham_menu")
let menu_cont=document.getElementById("menu-container")
let count1=0
ham_menu.addEventListener('click',function() {
    count1=count1+1
    if(count1%2==0){
        menu_cont.style.visibility="hidden"
    }
    else{
        menu_cont.style.visibility="visible"
    }
})


//searchbar code
let searchlist=['canon','nikon','sony','canon 3000d','canon 1500d','canon 200d','canon 700d'
            ,'nikon d3000','nikon d3500','nikon d5600','nikon d7500','sony ILCE 7M2K','sony a58']
let searchbox=document.getElementById("search-box")
let resultbox=document.querySelector(".resultbox")
// console.log(resultbox)

searchbox.onkeyup=function() {
    let result=[]
    let input=searchbox.value
    if(input.length){
        result=searchlist.filter((keyword)=>{
            return keyword.toLowerCase().includes(input.toLowerCase())
        })
    }
    display(result)
}

function display(result) {
    const content=result.map((list)=>{
        return "<li onclick=selectInput(this)>"+list+"</li>"
    })
    resultbox.innerHTML="<ul>" +content.join('')+ "</ul>"
}
function selectInput(list) {
    searchbox.value=list.textcontent
}
