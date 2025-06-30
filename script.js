const products = [
  {
    name: "Men's Jacket",
    price: 2999,
    category: "Men",
    image: "images/jack.jpeg"
  },
  {
    name: "Women's Dress",
    price: 1999,
    category: "Women",
    image: "images/womenjack.webp"
  },
  {
    name: "Men's Shoes",
    price: 2499,
    category: "Men",
    image: "images/menshoes.jpeg"
  },
  {
    name: "Scarf",
    price: 799,
    category: "Accessories",
    image: "images/scarf.jpeg"
  },
  {
    name: "Sunglasses",
    price: 1599,
    category: "Accessories",
    image: "images/sunglassess.jpg"
  },
  {
    name: "Women's Heels",
    price: 1899,
    category: "Women",
    image: "images/heels.jpeg"
  },
  {
    name: "Cap",
    price: 499,
    category: "Accessories",
    image: "images/cap.jpeg"
  },
  {
    name: "T-Shirt",
    price: 999,
    category: "Men",
    image: "images/tshirt.jpeg"
  },
  {
    name: "Skirt",
    price: 1299,
    category: "Women",
    image: "images/skirt.jpeg"
  }
];

let filtered = [...products];
const cart = [];


function displayProducts(productList) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  productList.forEach((p, index) => {
    grid.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <span>${p.category}</span>
        <button class="add-to-cart" data-index="${index}">Add to Cart</button>
      </div>
    `;
  });


  const cartButtons = document.querySelectorAll(".add-to-cart");
  cartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const selectedProduct = productList[index];
      addToCart(selectedProduct);
      alert("🛒 Added to cart successfully!");
    });
  });
}


function addToCart(product) {
  cart.push(product);
  updateCartUI();
}


function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <li>
        ${item.name} - ₹${item.price}
        <button onclick="removeFromCart(${index})">❌</button>
      </li>
    `;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}


function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}


displayProducts(products);


const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const result = filtered.filter(p => p.name.toLowerCase().includes(term));
  displayProducts(result);
});


const filterButtons = document.querySelectorAll("#filters button");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    filtered = category === "All" ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
  });
});

const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  if (value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }
  displayProducts(filtered);
});
