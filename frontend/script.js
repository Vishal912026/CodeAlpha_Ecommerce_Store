const API_URL = "https://codealpha-ecommerce-store-bqv6.onrender.com/api/products";

const productList = document.getElementById("product-list");
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");

let allProducts = [];
let loaded = false;

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showMessage(text) {
  productList.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px 0;">${text}</p>`;
}

function showProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    showMessage("No products found.");
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" style="cursor: pointer;">
      <h3 style="cursor: pointer;">${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.description)}</p>
      <div class="price">₹${escapeHtml(product.price)}</div>
      <button>Add to Cart</button>
    `;

    const openProduct = () => {
      window.location.href = "product.html?id=" + encodeURIComponent(product._id);
    };

    card.querySelector("img").addEventListener("click", openProduct);
    card.querySelector("h3").addEventListener("click", openProduct);
    card.querySelector("button").addEventListener("click", () => {
      addToCart(product._id, product.name, product.price);
    });

    productList.appendChild(card);
  });
}

function filterProducts() {
  if (!loaded) return;

  const text = searchInput ? searchInput.value.trim().toLowerCase() : "";

  const filtered = allProducts.filter((product) => {
    return (
      String(product.name).toLowerCase().includes(text) ||
      String(product.description).toLowerCase().includes(text)
    );
  });

  showProducts(filtered);
}

async function loadProducts() {
  showMessage("Loading products... (the first load can take up to a minute)");

  try {
    const response = await fetch(API_URL);
    const products = await response.json();

    if (!response.ok || !Array.isArray(products)) {
      showMessage("Could not load products. Please try again in a moment.");
      return;
    }

    allProducts = products;
    loaded = true;
    filterProducts();
  } catch (error) {
    console.log("Error loading products:", error);
    showMessage("Could not reach the server. Please refresh in a minute.");
  }
}

function addToCart(id, name, price) {
  let cart = getCart();

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  saveCart(cart);
    updateCartCount();
  alert(name + " added to cart!");
}

if (searchInput) {
  searchInput.addEventListener("input", filterProducts);
}
if (searchButton) {
  searchButton.addEventListener("click", filterProducts);
}

const searchWord = new URLSearchParams(window.location.search).get("search");
if (searchWord && searchInput) {
  searchInput.value = searchWord;
}

loadProducts();