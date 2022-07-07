let shop = document.getElementById("shop");

let shopItemData = [
  {
    id: 1,
    name: "shirt",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/shirt.avif",
  },
  {
    id: 2,
    name: "t-shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/t-shirt.avif",
  },
  {
    id: 3,
    name: "jeans",
    price: 400,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/jeans.avif",
  },
  {
    id: 4,
    name: "shoes",
    price: 800,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/shoes.avif",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      const { id, img, name, price, desc } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `  <div class="item" key=${id}>
        <img width="200" height="200" src=${img} alt="" />
        <div class="detail">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="button">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${
                search.item === undefined ? 0 : search.item
               }</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(" "));
};

generateShop();

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
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};
//   console.log(search.item);

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  console.log(basket.map((x) => x.item).reduce((a, c) => a + c, 0));
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((a, c) => a + c, 0);
};

calculation();
