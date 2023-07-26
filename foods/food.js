let shop_icon = document.getElementById("shop_icon");
let cardAdd = document.querySelector(".add_sideCard_container");
   
shop_icon.addEventListener("click",()=>{
    cardAdd.classList.add("add_sideCard");
});

const foodDetail =[{
        id:1,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-1.png',
        prodect_name:"Food 1",
        product_price:200
    },
    {
        id:2,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-2.png',
        prodect_name:"Food 2",
        product_price:110
    },
    {
        id:3,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-3.png',
        prodect_name:"Food 3",
        product_price:340
    },
    {
        id:4,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-4.png',
        prodect_name:"Food 4",
        product_price:80
    },
    {
        id:5,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-5.png',
        prodect_name:"Food 5",
        product_price:230
    },
    {
        id:6,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-6.png',
        prodect_name:"Food 6",
        product_price:45
    }
];


    let card_container = document.querySelector(".card_container");
    card_container.innerHTML="";
    foodDetail.map((item)=> {
        let createElement =document.createElement("div");
        createElement.className="cards";
        createElement.innerHTML =`
          <div>
              <img src="${item.img}" class="image_source" alt="">
          </div>
          <h4 class="prodect_name">${item.prodect_name}</h4>
          <p class="product_price">${item.product_price}</p>
          <button class="add_card_button" onclick="handleAdd(${item.id})">Add to Card</button>
               `
        card_container.appendChild(createElement);
    });


    // CLICK THE ADD TO CARD BUTTON OPEN SIDE CARD UI
    let add_card_button = document.querySelectorAll(".add_card_button");
    add_card_button.forEach((button)=>{
        button.addEventListener("click",()=>{
            let cardAdd = document.querySelector(".add_sideCard_container");
                cardAdd.classList.add("add_sideCard");
        });
    });

    let cardClose = document.querySelector(".fa-xmark");
        cardClose.addEventListener("click",()=>{
           cardAdd.classList.remove("add_sideCard");
        });

    let cart = [];
    // CLICK ADD TO CARD BUTTON ADDED THE FOOD CARD DETAILS 
    function handleAdd(foodId) {
       let product = foodDetail.find(products => products.id === foodId);

        if(product){
            const cartItemIndex = cart.findIndex(item => item.id === foodId);

        if (cartItemIndex !== -1) { 
            alert("already add Cart");
        } else {
            cart.push({ ...product, quantity: 1 });
        }
            addcard();
        }
    }
 
    // REMOVE CARD
    function handleDelete(removeId) {
        cart = cart.filter(item => item.id !== removeId);
        alert("Item removed from cart");
        addcard();
    }

    function increaseQuantity(increaseId) {
        const cartItem = cart.find(item => item.id === increaseId);
        if (cartItem) {
            cartItem.quantity += 1;
            addcard();
        }
    }

    function decreaseQuantity(decreaseId) {
        const cartItem = cart.find(item => item.id === decreaseId);
        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            addcard();
        }
    }
    
    function addcard(){
         let card_item_container =document.querySelector(".card_item_container");
         card_item_container.innerHTML='';  
         
         let total = 0;
         let cartCount = 0;

         cart.map((item)=>{
            let create_card_items_element =document.createElement("div");
            create_card_items_element.className="card_items";

            const itemPrice = item.product_price * item.quantity;
            total = total + itemPrice;
            cartCount = cartCount + item.quantity;

            create_card_items_element.innerHTML =
            `
            <div class="card_item_image_container">
                <img src="${item.img}" alt="">
            </div>
            <div class="card_item_content">
              <div>
                <h4 class="card_item_food_name">${item.prodect_name}</h4>
                <p class="card_item_price">${item.product_price}</p>
                <div class="quantity_container">
                    <button onclick="increaseQuantity(${item.id})">+</button>
                    <p>${item.quantity}</p>
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                </div>
              </div>
            <div> 
                <p class="card_item_amount">${itemPrice}</p>
            </div>
            </div>
            <div class="card_item_delete" onclick="handleDelete(${item.id})">
            <i class="fa-solid fa-trash"></i>
            </div>
            `
            card_item_container.appendChild(create_card_items_element);
        });
        
        let total_price = document.querySelector(".total_price");
            total_price.innerHTML ="Total:" +total;

        let Count = document.querySelector(".count");
            Count.innerHTML = cartCount;
    }


 
