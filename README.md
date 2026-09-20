# ShopEasy - E-commerce Store

A full stack e-commerce website built as Task 1 of the CodeAlpha Full Stack Development Internship.

## 🚀 Live Demo

- **Frontend:** https://dancing-crumble-b95745.netlify.app
- **Backend (API):** https://codealpha-ecommerce-store-bqv6.onrender.com

> The backend is on Render's free plan, so the first load after some inactivity can take 30-50 seconds.

## Features

- User registration and login (password hashing with bcrypt, JWT token)
- Product listing page with multiple products
- Product details page for each item
- Shopping cart (stored in localStorage)
- Order placement / checkout
- MongoDB database for users, products and orders

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Other:** bcryptjs, jsonwebtoken, Thunder Client (API testing)



## How to Run Locally

1. Clone the repository:

```
git clone https://github.com/Vishal912026/CodeAlpha_Ecommerce_Store.git
cd CodeAlpha_Ecommerce_Store
```

2. Install backend dependencies:

```
cd backend
npm install
```

3. Create a `.env` file inside the `backend` folder with these variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
```

4. (Optional) Add sample products to the database, run this only once:

```
node seedProducts.js
```

5. Start the backend server:

```
npm start
```

6. Open `frontend/index.html` with the Live Server extension in VS Code.

Note: the frontend files currently call the deployed backend. To use your local server, replace `https://codealpha-ecommerce-store-bqv6.onrender.com` with `http://localhost:5000` in `script.js`, `cart.js`, `login.js` and `product.js`.

## What I Learned

Building this project helped me understand how the frontend and backend connect through APIs, how to store data in MongoDB, how authentication works with JWT, and how to structure a full stack project properly.

## Author

**Vishal Kumar Prajapati**  
Full Stack Development Intern