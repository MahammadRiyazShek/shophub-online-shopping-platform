// Node.js + Express backend for ShopHub (optional - frontend works standalone with localStorage)
// Run: npm install express cors && node server.js

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));   // serve frontend

let products = [
  {id:1, name:"Wireless Headphones", price:79.99, cat:"Electronics", stock:23},
  {id:2, name:"Smart Watch Pro", price:199.99, cat:"Electronics", stock:15}
];
let orders = [];

// GET all products
app.get('/api/products', (req, res) => res.json(products));

// GET single product
app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x.id === +req.params.id);
  p ? res.json(p) : res.status(404).json({error:'Not found'});
});

// POST create order
app.post('/api/orders', (req, res) => {
  const order = { id: 'ORD-'+Date.now(), ...req.body, date: new Date().toISOString() };
  orders.push(order);
  res.status(201).json(order);
});

// GET all orders
app.get('/api/orders', (req, res) => res.json(orders));

// Health check
app.get('/api/health', (req, res) => res.json({status:'OK', service:'ShopHub API'}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🛒 ShopHub server running on http://localhost:${PORT}`));
