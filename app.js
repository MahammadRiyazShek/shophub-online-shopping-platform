const { useState, useEffect, useMemo } = React;

const PRODUCTS = [
  {id:1, name:"Wireless Headphones", price:79.99, cat:"Electronics", img:"🎧", desc:"Premium noise-cancelling Bluetooth headphones with 30hr battery.", rating:4.7, stock:23},
  {id:2, name:"Smart Watch Pro", price:199.99, cat:"Electronics", img:"⌚", desc:"Fitness tracking, heart rate, GPS, water resistant to 50m.", rating:4.8, stock:15},
  {id:3, name:"Running Shoes", price:89.50, cat:"Fashion", img:"👟", desc:"Lightweight breathable mesh, cushioned sole, available in 5 colors.", rating:4.5, stock:42},
  {id:4, name:"Coffee Maker", price:129.00, cat:"Home", img:"☕", desc:"12-cup programmable drip coffee maker with thermal carafe.", rating:4.6, stock:18},
  {id:5, name:"Backpack 30L", price:54.99, cat:"Fashion", img:"🎒", desc:"Water-resistant, padded laptop sleeve, USB charging port.", rating:4.4, stock:31},
  {id:6, name:"Bluetooth Speaker", price:45.00, cat:"Electronics", img:"🔊", desc:"Portable 360° sound, IPX7 waterproof, 24hr playtime.", rating:4.5, stock:55},
  {id:7, name:"Yoga Mat Premium", price:29.99, cat:"Sports", img:"🧘", desc:"Non-slip, 6mm thick, eco-friendly TPE material with carry strap.", rating:4.7, stock:67},
  {id:8, name:"Desk Lamp LED", price:39.99, cat:"Home", img:"💡", desc:"Touch dimmer, 5 color temperatures, USB charging port.", rating:4.6, stock:28},
  {id:9, name:"Mechanical Keyboard", price:119.00, cat:"Electronics", img:"⌨️", desc:"RGB backlit, blue switches, hot-swappable, USB-C.", rating:4.8, stock:12},
  {id:10, name:"Sunglasses UV400", price:24.99, cat:"Fashion", img:"🕶️", desc:"Polarized lenses, lightweight metal frame, UV protection.", rating:4.3, stock:89},
  {id:11, name:"Air Fryer 5L", price:99.99, cat:"Home", img:"🍳", desc:"Digital touchscreen, 8 preset modes, dishwasher-safe basket.", rating:4.7, stock:21},
  {id:12, name:"Gaming Mouse", price:49.99, cat:"Electronics", img:"🖱️", desc:"16000 DPI, programmable buttons, RGB, ergonomic design.", rating:4.6, stock:38}
];

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')||'[]'));
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [view, setView] = useState('shop');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(()=>{ localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);

  const cats = ['All', ...new Set(PRODUCTS.map(p=>p.cat))];
  const filtered = useMemo(()=>PRODUCTS.filter(p=>
    (category==='All'||p.cat===category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  ),[search,category]);

  const addToCart = (p)=>{
    setCart(prev=>{
      const ex = prev.find(x=>x.id===p.id);
      if(ex) return prev.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x);
      return [...prev, {...p, qty:1}];
    });
    setToast(`✓ Added "${p.name}" to cart`);
    setTimeout(()=>setToast(''), 2000);
  };

  const updateQty = (id, d) => setCart(prev => prev.map(x => x.id===id? {...x,qty:Math.max(1,x.qty+d)}:x));
  const remove = (id) => setCart(prev => prev.filter(x=>x.id!==id));
  const total = cart.reduce((s,x)=>s+x.price*x.qty, 0);
  const totalItems = cart.reduce((s,x)=>s+x.qty, 0);

  const checkout = () => {
    if(cart.length===0) return;
    // Simulate Node.js API call
    const order = { id: 'ORD-'+Date.now(), items: cart, total: total.toFixed(2), date: new Date().toISOString() };
    const orders = JSON.parse(localStorage.getItem('orders')||'[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    setCart([]);
    setShowCart(false);
    setView('success');
    setSelected(order);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={()=>setView('shop')}>
          <span className="logo-icon">🛒</span>
          <h1>ShopHub</h1>
        </div>
        <nav>
          <a onClick={()=>setView('shop')} className={view==='shop'?'active':''}>Shop</a>
          <a onClick={()=>setView('orders')} className={view==='orders'?'active':''}>My Orders</a>
          <a onClick={()=>setView('about')} className={view==='about'?'active':''}>About</a>
        </nav>
        <button className="cart-btn" onClick={()=>setShowCart(!showCart)}>
          🛍️ Cart <span className="badge">{totalItems}</span>
        </button>
      </header>

      {toast && <div className="toast">{toast}</div>}

      {view==='shop' && (
        <main className="main">
          <section className="hero">
            <h2>Discover Amazing Products</h2>
            <p>Clean UI · Fast Checkout · Secure Payments</p>
          </section>

          <div className="filters">
            <input type="text" placeholder="🔍 Search products..." value={search} onChange={e=>setSearch(e.target.value)}/>
            <div className="chips">
              {cats.map(c=>(
                <button key={c} className={`chip ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="products">
            {filtered.map(p=>(
              <div className="product-card" key={p.id}>
                <div className="product-img" onClick={()=>setSelected(p)}>{p.img}</div>
                <h3>{p.name}</h3>
                <p className="cat">{p.cat}</p>
                <div className="rating">{'★'.repeat(Math.floor(p.rating))}{'☆'.repeat(5-Math.floor(p.rating))} <small>({p.rating})</small></div>
                <div className="price-row">
                  <span className="price">${p.price.toFixed(2)}</span>
                  <span className="stock">{p.stock} in stock</span>
                </div>
                <button className="btn-add" onClick={()=>addToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </main>
      )}

      {view==='orders' && (
        <main className="main">
          <h2>📦 My Orders</h2>
          <OrdersList />
        </main>
      )}

      {view==='success' && selected && (
        <main className="main">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2>Order Placed Successfully!</h2>
            <p>Order ID: <b>{selected.id}</b></p>
            <p>Total: <b>${selected.total}</b></p>
            <p className="muted">Your items will be shipped within 2 business days.</p>
            <button className="btn-primary" onClick={()=>setView('shop')}>Continue Shopping</button>
          </div>
        </main>
      )}

      {view==='about' && (
        <main className="main">
          <div className="about-card">
            <h2>About ShopHub</h2>
            <p>An online shopping platform built with <b>React JS</b> for the frontend and <b>Node JS</b> server backend.</p>
            <h3>Features</h3>
            <ul>
              <li>Clean, responsive User Interface</li>
              <li>Real-time product search & category filters</li>
              <li>Persistent shopping cart (localStorage / Node REST API)</li>
              <li>Order management & history</li>
              <li>Checkout flow with confirmation</li>
            </ul>
            <h3>Tech Stack</h3>
            <ul>
              <li><b>Frontend:</b> React 18 (hooks, components, state management)</li>
              <li><b>Backend:</b> Node.js + Express REST API (server.js included)</li>
              <li><b>Storage:</b> In-memory store / can be wired to MongoDB or PostgreSQL</li>
            </ul>
          </div>
        </main>
      )}

      {showCart && (
        <div className="cart-overlay" onClick={()=>setShowCart(false)}>
          <div className="cart-panel" onClick={e=>e.stopPropagation()}>
            <h3>🛍️ Shopping Cart</h3>
            {cart.length===0 ? <p className="muted">Cart is empty</p> : (
              <>
                {cart.map(item=>(
                  <div className="cart-item" key={item.id}>
                    <span className="ci-img">{item.img}</span>
                    <div className="ci-info">
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)} × {item.qty}</p>
                    </div>
                    <div className="ci-actions">
                      <button onClick={()=>updateQty(item.id,-1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={()=>updateQty(item.id,1)}>+</button>
                      <button className="rm" onClick={()=>remove(item.id)}>✕</button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <span>Total:</span><b>${total.toFixed(2)}</b>
                </div>
                <button className="btn-checkout" onClick={checkout}>Checkout</button>
              </>
            )}
          </div>
        </div>
      )}

      {selected && selected.cat && (
        <div className="modal" onClick={()=>setSelected(null)}>
          <div className="modal-card" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>
            <div className="modal-img">{selected.img}</div>
            <h2>{selected.name}</h2>
            <p className="cat">{selected.cat}</p>
            <p>{selected.desc}</p>
            <div className="rating">{'★'.repeat(Math.floor(selected.rating))}{'☆'.repeat(5-Math.floor(selected.rating))} ({selected.rating})</div>
            <div className="price">${selected.price.toFixed(2)}</div>
            <button className="btn-primary" onClick={()=>{addToCart(selected); setSelected(null);}}>Add to Cart</button>
          </div>
        </div>
      )}

      <footer>© 2026 ShopHub · Built with React JS & Node JS</footer>
    </div>
  );
}

function OrdersList(){
  const orders = JSON.parse(localStorage.getItem('orders')||'[]');
  if(orders.length===0) return <p className="muted">No orders yet. Start shopping!</p>;
  return (
    <div className="orders-list">
      {orders.slice().reverse().map(o=>(
        <div className="order-card" key={o.id}>
          <div className="order-head">
            <b>{o.id}</b>
            <span>{new Date(o.date).toLocaleString()}</span>
          </div>
          <div className="order-items">
            {o.items.map(i=>(<span key={i.id}>{i.img} {i.name} ×{i.qty}</span>))}
          </div>
          <div className="order-total">Total: <b>${o.total}</b></div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
