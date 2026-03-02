const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 299,
    image: "https://via.placeholder.com/300",
    description: "High quality wireless headphones."
  },
  {
    id: 2,
    name: "Gaming Mouse",
    price: 149,
    image: "https://via.placeholder.com/300",
    description: "RGB high precision gaming mouse."
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 499,
    image: "https://via.placeholder.com/300",
    description: "Track your health and notifications."
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if(cartCount) cartCount.innerText = count;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function renderProducts() {
  const list = document.getElementById("product-list");
  if(!list) return;

  list.innerHTML = products.map(product => `
    <div class="product-card" onclick="viewProduct(${product.id})">
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(event, ${product.id})">Add to Cart</button>
    </div>
  `).join("");
}

function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if(!container) return;

  const id = localStorage.getItem("selectedProduct");
  const product = products.find(p => p.id == id);

  container.innerHTML = `
    <img src="${product.image}">
    <div>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <h3>$${product.price}</h3>
      <button onclick="addToCart(event, ${product.id})">Add to Cart</button>
    </div>
  `;
}

function addToCart(event, id) {
  event.stopPropagation();
  const item = cart.find(p => p.id === id);
  if(item) {
    item.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  alert("Added to cart!");
}

function renderCart() {
  const container = document.getElementById("cart-items");
  if(!container) return;

  let total = 0;

  container.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    total += product.price * item.quantity;
    return `
      <div>
        <h4>${product.name}</h4>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${product.price * item.quantity}</p>
      </div>
    `;
  }).join("");

  const totalEl = document.getElementById("total");
  if(totalEl) totalEl.innerText = "Total: $" + total;
}

updateCartCount();
renderProducts();
renderProductDetail();
renderCart();
