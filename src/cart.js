let basket = JSON.parse(localStorage.getItem("data")) || [];

let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  console.log(basket.map((x) => x.item).reduce((a, c) => a + c, 0));
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((a, c) => a + c, 0);
};

calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        console.log(x);
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        console.log(search);
        return `
           <div class="cart-item">  
            <img src=${search.img}  width='100' alt="" />
            <div class="details">
               <div class="title-price-x">
                 <h4 class="title-price">
                   <p>${search.name}</p>
                   <p class="cart-item-price">$ ${search.price}</p>
                 </h4>
                 <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
               </div>
            <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
               <h3>$ ${item * search.price} </h3>
            </div>
           </div>
          `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
          <h2>Cart is empty</h2>
          <a href="index.html">
          <button class="HomeBtn">Back to home</button> 
          </a>
         `;
  }
};

generateCartItem();

let increment = (id) => {
  let selected = id;
  let search = basket.find((x) => x.id === selected);
  if (search === undefined) {
    basket.push({
      id: selected,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  //   console.log(search);
  //   console.log(basket);

  update(selected);
  generateCartItem();

  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selected = id;
  let search = basket.find((x) => x.id === selected);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  //   console.log(basket);
  update(selected);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItem();

  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selected = id;
  basket = basket.filter((x) => x.id !== selected);
  console.log(selected);
  generateCartItem();
  TotalAmount();
  calculation();

  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItem();
  calculation();

  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((a, c) => a + c, 0);
    console.log(amount);
    label.innerHTML = `
     <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
     `;
  } else return;
};

TotalAmount();
