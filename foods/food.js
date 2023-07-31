let shop_icon = document.getElementById("shop_icon");
let cardHideShow = document.querySelector(".add_cardItem_container");
   
shop_icon.addEventListener("click",()=>{
    cardHideShow.classList.add("add_sideCard");
});

const foodDetails = [{
        id:1,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-1.png',
        prodect_name:"paneer gravy",
        product_price:200
    },
    {
        id:2,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-2.png',
        prodect_name:"Vindola",
        product_price:110
    },
    {
        id:3,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-3.png',
        prodect_name:"Veg Noodles",
        product_price:340
    },
    {
        id:4,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-4.png',
        prodect_name:"Egg Noodles",
        product_price:80
    },
    {
        id:5,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-5.png',
        prodect_name:"Chocho Tips",
        product_price:230
    },
    {
        id:6,
        img:'https://bootstrapmade.com/demo/templates/Yummy/assets/img/menu/menu-item-6.png',
        prodect_name:"Tikka ",
        product_price:45
    }
];

    let card_container = document.querySelector(".card_container");
    card_container.innerHTML = "";
    foodDetails.map((item)=> {
        let createCards = document.createElement("div");
            createCards.className = "cards";
        createCards.innerHTML =`
          <div>
              <img src="${item.img}" class="image_source" alt="">
          </div>
          <h4 class="prodect_name">${item.prodect_name}</h4>
          <p class="product_price">${item.product_price}</p>
          <button class="add_card_button" onclick="CartHandle(${item.id})">Add to Card</button>
               `
        card_container.appendChild(createCards);
    });

    // CLICK THE ADD TO CARD BUTTON OPEN SIDE CARD UI
    let add_card_button = document.querySelectorAll(".add_card_button");
    add_card_button.forEach((button)=>{
        button.addEventListener("click",()=>{
            let cardHideShow = document.querySelector(".add_cardItem_container");
                cardHideShow.classList.add("add_sideCard");
        });
    });

    let ShopIcon = document.querySelector(".fa-xmark");
        ShopIcon.addEventListener("click",()=>{
           cardHideShow.classList.remove("add_sideCard");
        });

    // CLICK ADD TO CARD BUTTON ADDED THE FOOD CARD DETAILS 
    let cart = [];
    function CartHandle(foodId) {
       let product = foodDetails.find(products => products.id === foodId);

        if(product){
            const cartItemIndex = cart.findIndex(item => item.id === foodId);

        if (cartItemIndex !== -1) { 
            alert("already add Cart");
        } else {
            cart.push({ ...product, quantity: 1 });
        }
            HandleCardAdd();
        }
    }
 
    // REMOVE CARD
    function HandleDelete(removeId) {
        cart = cart.filter(item => item.id !== removeId);
        alert("Item removed from cart");
        HandleCardAdd();
    }

    function increaseQuantity(increaseId) {
        const cartItem = cart.find(item => item.id === increaseId);
        if (cartItem) {
            cartItem.quantity += 1;
            HandleCardAdd();
        }
    }

    function decreaseQuantity(decreaseId) {
        const cartItem = cart.find(item => item.id === decreaseId);
        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            HandleCardAdd();
        }
    }

    function HandleCardAdd(){
         let card_item_container = document.querySelector(".card_item_container");
             card_item_container.innerHTML = '';  
         
         let total = 0;
         let ShopCartCount = 0;

        cart.map((item)=>{
            let create_card_items_element = document.createElement("div");
                create_card_items_element.className = "card_items";
            
            var itemPrice = item.product_price * item.quantity;
            total = total + itemPrice;
            ShopCartCount = ShopCartCount + 1;

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
            <div class="card_item_delete" onclick="HandleDelete(${item.id})">
            <i class="fa-solid fa-trash"></i>
            </div>
            `
            card_item_container.appendChild(create_card_items_element);
        });
       
        let total_price = document.querySelector(".total_price");
            total_price.innerHTML = "Total:" +total;

        let CartCount = document.querySelector(".CartCount");
            CartCount.innerHTML = ShopCartCount;
    }
    // PLACE ORDER CARD
    let BuyOrder = document.querySelector(".Price_order_container button");
        BuyOrder.addEventListener("click",PlaceOrder);

    function PlaceOrder() {
        let cardHideShow = document.querySelector(".add_cardItem_container");
            cardHideShow.classList.remove("add_sideCard");
                
        if(cart.length === 0){
            alert("The Cart is empty Please Add Cart First");
        }
        else{
            let placeOrderShow = document.querySelector(".place_order_opacity");
                placeOrderShow.classList.add("place_order_opcityshow");
                placeOrderShow.style.display = "flex";

            let total = 0;
            cart.map((item)=>{
            let create_place_order_row = document.createElement("tr");
                create_place_order_row.className = "place_order_card_item";
            const itemPrice = item.product_price * item.quantity;
                  total = total + itemPrice;
                  
            create_place_order_row.innerHTML = `
            <td class="price_order_image_container">
                <img src="${item.img}" alt="">
            </td>  
                <td class="price_order_food_name">${item.prodect_name}</td>
                <td class="price_order_price">${item.product_price}</td>
                <td class="price_order_amount">${itemPrice}</td>
            
                `

            let place_order_card_item_tbody = document.querySelector("tbody");
            place_order_card_item_tbody.appendChild(create_place_order_row);
            });

        let total_price = document.querySelector(".place_total_price");
            total_price.innerHTML = "Total:" +total;

        }
    }

    // BUY ORDER POPUP SHOW 
    function HandleBuyOrder(){
        alert("Sucessfully Added Cart");
        let place_order_card_tbody = document.querySelector("tbody");
            place_order_card_tbody.innerHTML = "";
        let placeOrderShow = document.querySelector(".place_order_opacity");
            placeOrderShow.classList.remove("place_order_opcityshow");
    }
    function HandleBuyOrderCancel(){
        alert("your Order is Cancelled")
        let place_order_card_tbody = document.querySelector("tbody");
            place_order_card_tbody.innerHTML = "";
        let placeOrderShow = document.querySelector(".place_order_opacity");
            placeOrderShow.classList.remove("place_order_opcityshow");
    }
