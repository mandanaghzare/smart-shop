# 🛍️ Smart Shop

A modern, fully responsive e-commerce web application built with Next.js, TypeScript, Tailwind CSS, Zustand, and Firebase Authentication.

## 🚀 Live Demo

https://smart-shop-liard.vercel.app/

## 📂 GitHub Repository

https://github.com/mandanaghzare/smart-shop

---

## 📖 Overview

Smart Shop is a feature-rich e-commerce application that allows users to browse products, search and filter items, manage a shopping cart and wishlist, authenticate securely, place orders, and track purchase history.

The project was built to demonstrate modern frontend development practices, global state management, URL-based filtering, authentication workflows, and responsive UI design.

---

## ✨ Features

### 🛒 Product Catalog

* Browse products across multiple categories
* Product details page
* Discount pricing display
* Product ratings and stock status
* Related product recommendations
* Recently viewed products

### 🔍 Advanced Filtering

* Category filtering
* Search functionality
* Price range filtering
* Stock availability filtering
* Sorting options
* URL-synced filters using query parameters
* Filter persistence after page refresh

### ❤️ Wishlist

* Add products to wishlist
* Remove products from wishlist
* Persistent wishlist storage

### 🛍️ Shopping Cart

* Add products to cart
* Update quantities
* Remove products
* Persistent cart state
* Cart summary calculations

### 📦 Checkout & Orders

* Checkout page
* Order placement flow
* Automatic cart clearing after checkout
* Order history tracking

### 🔐 Authentication

* Firebase Authentication
* Email & Password Registration
* Email & Password Login
* Persistent authentication state
* Protected Routes
* Route guarding for authenticated pages

### 🎨 UI & UX

* Fully responsive design
* Dark / Light mode
* Skeleton loading states
* Toast notifications
* Modern card-based interface
* Accessible navigation
* Loading and hydration handling

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### State Management

* Zustand
* Zustand Persist Middleware

### Authentication

* Firebase Authentication

### Deployment

* Vercel

---

## 📸 Screenshots

### Home Page

![Home](public/screenshots/home.png)

### Product Details

![Product Details](public/screenshots/product-details.png)

### Shopping Cart

![Cart](public/screenshots/cart.png)

### Orders Page

![Orders](public/screenshots/orders.png)

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/mandanaghzare/smart-shop.git
```

Navigate to the project:

```bash
cd smart-shop
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## 📁 Project Structure

```txt
app/
├── cart/
├── checkout/
├── login/
├── orders/
├── products/
│   └── [id]/
├── profile/
├── register/
├── wishlist/
├── layout.tsx
└── page.tsx

components/
store/
lib/
types/
data/
```

---

## 🎯 What I Practiced

* Next.js App Router
* Dynamic Routing
* TypeScript
* Zustand State Management
* Firebase Authentication
* Protected Routes
* URL Query Parameters
* Responsive Design
* Dark Mode Implementation
* Toast Notifications
* Component Architecture
* E-commerce User Flows
* Deployment with Vercel

---

## 🌐 Deployment

Deployed on Vercel:

https://smart-shop-liard.vercel.app/

---

## 👩‍💻 Author

GitHub:
https://github.com/mandanaghzare
