let shop_icon = document.getElementById("shop_icon");
let cardAdd = document.querySelector(".add_sideCard_container")
   
shop_icon.addEventListener("click",()=>{
    cardAdd.classList.add("add_sideCard_toggle");
});

let cardClose = document.querySelector(".fa-xmark");
    cardClose.addEventListener("click",()=>{
    cardAdd.classList.remove("add_sideCard_toggle");
});