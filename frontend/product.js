const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProductDetails() {
  try {
const response = await fetch(`https://codealpha-ecommerce-store-bqv6.onrender.com/api/products/${productId}`);
    const product = await response.json();

    const detailsBox = document.getElementById("product-details");

    detailsBox.innerHTML = `
      <div class="product-details">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <div class="price">₹${product.price}</div>
          <p>In stock: ${product.stock}</p>
          <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
        </div>
      </div>
    `;
  } catch (error) {
    console.log("Error loading product details:", error);
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

loadProductDetails();