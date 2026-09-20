function getCartKey() {
  const userId = localStorage.getItem("userId");
  return userId ? "cart_" + userId : "cart";
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(getCartKey())) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

function updateCartCount() {
  const cartLink = document.querySelector('nav a[href*="cart"]');
  if (!cartLink) return;

  const cart = getCart();

  let count = 0;
  cart.forEach((item) => {
    count += item.quantity;
  });

  cartLink.textContent = "Cart";

  if (count > 0) {
    const badge = document.createElement("span");
    badge.className = "cart-count";
    badge.textContent = count;
    cartLink.appendChild(badge);
  }
}

function setupUserMenu() {
  const loginLink = document.querySelector('nav a[href*="login"]');
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");

  if (!loginLink || !token) return;

  const greeting = document.createElement("span");
  greeting.className = "nav-user";
  greeting.textContent = "Hi, " + (name ? name.split(" ")[0] : "User");

  const logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.textContent = "Logout";
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "login.html";
  });

  loginLink.replaceWith(greeting, logoutLink);
}

function setupSearch() {
  if (document.getElementById("product-list")) return;

  const input = document.querySelector(".search-bar input");
  const button = document.querySelector(".search-bar button");
  if (!input || !button) return;

  function goSearch() {
    const text = input.value.trim();
    window.location.href = text
      ? "index.html?search=" + encodeURIComponent(text)
      : "index.html";
  }

  button.addEventListener("click", goSearch);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") goSearch();
  });
}

updateCartCount();
setupUserMenu();
setupSearch();