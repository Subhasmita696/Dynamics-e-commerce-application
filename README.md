# 🛒 FreshMart — Grocery Shopping App

A full-stack grocery e-commerce application built with **Java Spring Boot**, **React**, and **MySQL**.

---

## 📁 Project Structure

```
backend/
│
├── 📄 pom.xml
│
└── src/main/
    ├── resources/
    │   └── 📄 application.properties
    │
    └── java/com/grocery/
        │
        ├── 📄 GroceryAppApplication.java
        │
        ├── config/
        │   └── 📄 SecurityConfig.java
        │
        ├── entity/
        │   ├── 📄 User.java
        │   ├── 📄 Category.java
        │   ├── 📄 Product.java
        │   ├── 📄 Order.java
        │   └── 📄 OrderItem.java
        │
        ├── repository/
        │   ├── 📄 UserRepository.java
        │   ├── 📄 CategoryRepository.java
        │   ├── 📄 ProductRepository.java
        │   └── 📄 OrderRepository.java
        │
        ├── service/
        │   ├── 📄 UserService.java
        │   ├── 📄 ProductService.java
        │   └── 📄 OrderService.java
        │
        ├── controller/
        │   ├── 📄 UserController.java
        │   ├── 📄 ProductController.java
        │   ├── 📄 OrderController.java
        │   └── 📄 CategoryController.java
        │
        └── exception/
            └── 📄 GlobalExceptionHandler.java
frontend/
│
├── public/
│   └── 📄 index.html
│
├── src/
│   ├── 📄 index.js
│   ├── 📄 index.css
│   ├── 📄 App.js
│   ├── 📄 App.css
│   │
│   ├── api/
│   │   └── 📄 api.js
│   │
│   ├── context/
│   │   └── 📄 CartContext.js
│   │
│   ├── components/
│   │   ├── 📄 Navbar.js
│   │   └── 📄 ProductCard.js
│   │
│   └── pages/
│       ├── 📄 HomePage.js
│       ├── 📄 ProductsPage.js
│       ├── 📄 CartPage.js
│       ├── 📄 CheckoutPage.js
│       └── 📄 OrdersPage.js
│
└── 📄 package.json
└── database/
    └── schema.sql
```

---

## ⚙️ Setup Instructions

### 1. MySQL Database

```sql
-- Run this in MySQL Workbench or terminal
source database/schema.sql;
```

### 2. Backend (Spring Boot)

1. Open `backend/` in IntelliJ IDEA or Eclipse
2. Update `application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   ```
3. Run the app:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Server starts on: `http://localhost:8080`

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```
App opens at: `http://localhost:3000`

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/{id} | Get product by ID |
| GET | /api/products/category/{id} | Get by category |
| GET | /api/products/search?keyword= | Search products |
| POST | /api/products | Create product |
| PUT | /api/products/{id} | Update product |
| DELETE | /api/products/{id} | Delete product |
| GET | /api/orders | Get all orders |
| GET | /api/orders/{id} | Get order by ID |
| GET | /api/orders/user/{userId} | Get user orders |
| POST | /api/orders | Create order |
| PUT | /api/orders/{id}/status | Update order status |
| POST | /api/users/register | Register user |
| GET | /api/users/{id} | Get user |

---

## ✨ Features

- 🏠 Home page with hero banner and featured products
- 🔍 Product search and category filtering
- 🛒 Shopping cart with quantity management
- 📦 Order placement and order history
- 📱 Responsive layout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA, Spring Security |
| Database | MySQL 8 |
| Frontend | React 18, React Router 6, Axios |
| Build | Maven (backend), npm (frontend) |
