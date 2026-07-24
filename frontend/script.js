const API_URL = "https://codealpha-ecommerce-store-bqv6.onrender.com/api/users";
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

     card.innerHTML = `
  <img src="${product.image}" alt="${product.name}" onclick="window.location.href='product.html?id=${product._id}'" style="cursor: pointer;">
  <h3 onclick="window.location.href='product.html?id=${product._id}'" style="cursor: pointer;">${product.name}</h3>
  <p>${product.description}</p>
  <div class="price">₹${product.price}</div>
  <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
`;

      productList.appendChild(card);
    });
  } catch (error) {
    console.log("Error loading products:", error);
  }
}

function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

loadProducts();