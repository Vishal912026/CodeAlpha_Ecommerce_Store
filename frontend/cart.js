function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <span>${item.name}</span>
      <span>Qty: ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;

    cartList.appendChild(row);
  });

  cartTotal.innerText = "Total: ₹" + total;
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

document.getElementById("checkout-btn").addEventListener("click", async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  
  const orderData = {
    products: cart.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    })),
  };

  try {
    const response = await fetch("https://codealpha-ecommerce-store-bqv6.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      loadCart();
    } else if (response.status === 401) {
      alert("Session expired, please login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Something went wrong placing the order.");
    }
  } catch (error) {
    console.log("Checkout error:", error);
    alert("Could not reach the server. Please try again.");
  }
});

loadCart();