# 🛒 ShopHub — Online Shopping Platform

An online shopping platform with a clean user interface where customers can browse, search, filter, and purchase items. Built with **React JS** frontend and **Node JS** server backend.

![React](https://img.shields.io/badge/React-18-61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-Express-339933) ![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Live Demo
**GitHub Pages:** `https://<your-username>.github.io/<repo-name>/`
**With Backend (Render/Railway):** `https://<your-app>.onrender.com`

## ✨ Features
- 🎨 Clean, responsive User Interface
- 🔍 Real-time product search & category filtering (Electronics, Fashion, Home, Sports)
- 🛍️ Persistent shopping cart with quantity controls
- 💳 Smooth checkout flow with order confirmation
- 📦 Order history & tracking
- 🌟 Product ratings, stock indicators, detail modals
- 📱 Fully mobile-responsive

## 🛠️ Tech Stack
- **Frontend:** React JS 18 (hooks, components, state management)
- **Backend:** Node JS + Express REST API
- **Storage:** localStorage (client) + in-memory store (server); pluggable to MongoDB/PostgreSQL

## 📦 Files
- `index.html` — React app entry
- `app.js` — Main React component (12+ products, cart, checkout)
- `styles.css` — Styling
- `server.js` — Node.js Express backend (REST API)
- `package.json` — Node dependencies
- `README.md` — this file

## ⚙️ Run Locally
**Frontend only (no Node required):** open `index.html` in browser.

**With Node backend:**
```bash
npm install
npm start
# visit http://localhost:3000
```

## 🌐 Deployment
**Frontend (free, instant):**
- **GitHub Pages** → Settings → Pages → Source: main → root
- **Netlify / Vercel** → drag-drop or git import → live URL

**Full-stack with Node backend:**
- **Render.com** (free tier) → New Web Service → connect GitHub repo → Build: `npm install`, Start: `npm start`
- **Railway.app** → New Project → Deploy from GitHub
- **Vercel** with serverless functions

## 🔌 API Endpoints (server.js)
- `GET  /api/products` — list all products
- `GET  /api/products/:id` — get single product
- `POST /api/orders` — create order
- `GET  /api/orders` — list orders
- `GET  /api/health` — health check

## 📜 License
MIT
