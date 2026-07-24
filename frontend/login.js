const API_URL = "https://codealpha-ecommerce-store-bqv6.onrender.com/api/users";
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const toggleLink = document.getElementById("toggle-link");
const toggleText = document.getElementById("toggle-text");
const formTitle = document.getElementById("form-title");

let isLoginMode = true;

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLoginMode = !isLoginMode;

  if (isLoginMode) {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    formTitle.innerText = "Login";
    toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-link">Register here</a>';
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    formTitle.innerText = "Register";
    toggleText.innerHTML = 'Already have an account? <a href="#" id="toggle-link">Login here</a>';
  }

  document.getElementById("toggle-link").addEventListener("click", (e) => {
    e.preventDefault();
    toggleLink.click();
  });
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Login error:", error);
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registered successfully! Please login.");
      toggleLink.click();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Register error:", error);
  }
});