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

---

## 🚀 DevOps & GitOps Architecture

This project uses modern DevOps practices with GitOps for deployment and monitoring. Here’s how everything fits together:

### 📦 Project Structure (DevOps Focus)

```
argocd/
  argocd-app-project.yaml         # Defines Argo CD project (permissions, destinations)
  argocd-application.yaml         # Main/sample Argo CD Application (manifests-based)
  backend-application.yaml        # Argo CD Application for backend (Helm)
  frontend-application.yaml       # Argo CD Application for frontend (Helm)
  prometheus-application.yaml     # Argo CD Application for Prometheus (Helm, official chart)
  grafana-application.yaml        # Argo CD Application for Grafana (Helm, official chart)

helm/
  backend/
    Chart.yaml
    values.yaml
    templates/
      deployment.yaml
      service.yaml
  frontend/
    Chart.yaml
    values.yaml
    templates/
      deployment.yaml
      service.yaml

database/
  schema.sql
```

---

### 🧩 How It Works

- **Argo CD** is used for GitOps-based continuous delivery. All deployments are managed declaratively via YAML files in the `argocd/` directory.
- **Helm** is used to template Kubernetes manifests for the backend and frontend, making deployments reusable and configurable.
- **Prometheus & Grafana** are deployed using their official Helm charts for monitoring and observability.
- **Kubernetes** is the target platform for all deployments.

---

### 📂 Key Files & Their Purpose

- **argocd/argocd-app-project.yaml**  
  Defines the Argo CD project, including allowed source repos and target namespaces.  
  _Importance: Sets boundaries and permissions for all Argo CD Applications._

- **argocd/argocd-application.yaml**  
  Example Argo CD Application manifest for deploying resources from k8s manifests.  
  _Importance: Shows how to deploy using plain manifests (non-Helm)._ 

- **argocd/backend-application.yaml**  
  Deploys the backend using the Helm chart in `helm/backend`.  
  _Importance: Demonstrates Helm-based deployment via Argo CD._

- **argocd/frontend-application.yaml**  
  Deploys the frontend using the Helm chart in `helm/frontend`.  
  _Importance: Demonstrates Helm-based deployment via Argo CD._

- **argocd/prometheus-application.yaml**  
  Deploys Prometheus using the official Helm chart.  
  _Importance: Adds monitoring to your cluster, a must-have for production._

- **argocd/grafana-application.yaml**  
  Deploys Grafana using the official Helm chart.  
  _Importance: Adds observability dashboards for your services._

- **helm/backend/** and **helm/frontend/**  
  Each contains a minimal Helm chart for templated, configurable deployments of your backend and frontend.

- **database/schema.sql**  
  SQL schema for initializing the MySQL database.

---

### 🏆 Why This Setup?

- **GitOps with Argo CD**: Ensures all cluster changes are versioned, auditable, and reproducible.
- **Helm**: Makes deployments DRY, reusable, and easy to configure for different environments.
- **Prometheus & Grafana**: Provide real-time monitoring and visualization, essential for production-grade systems.
- **Separation of Concerns**: Each file and directory has a clear, single responsibility.

---

### 📝 How to Use

1. Push all code and manifests to your Git repository.
2. Point Argo CD to your repo and sync the Applications.
3. Backend and frontend will be deployed via Helm charts.
4. Prometheus and Grafana will be deployed for monitoring and dashboards.
5. All configuration is managed as code—just update YAMLs and sync!
