function updateCartCount() {
  const cartLink = document.querySelector('nav a[href="cart.html"]');
  if (!cartLink) return;

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    cart = [];
  }

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
  const loginLink = document.querySelector('nav a[href="login.html"]');
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
    window.location.href = "index.html";
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