import { ArrowRight, Crosshair, Heart, Menu, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { formatCurrency, products, shippingThreshold } from '../data/catalog';
import { useShop } from '../store/ShopContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Drops', to: '/shop' },
  { label: 'Checkout', to: '/checkout' }
];

export function AppShell() {
  const {
    cart,
    cartCount,
    cartDrawerOpen,
    closeCartDrawer,
    openCartDrawer,
    removeFromCart,
    subtotal,
    updateQuantity,
    wishlist,
  } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/">
            <Crosshair size={18} />
            VALORIA
          </Link>
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="topbar-actions">
            <Link className="wishlist-link" to="/shop" aria-label={`${wishlist.length} wishlisted items`}>
              <Heart size={16} />
              <span>{wishlist.length}</span>
            </Link>
            <button
              className="cart-link"
              type="button"
              aria-label={`Cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              onClick={openCartDrawer}
            >
              <ShoppingBag size={16} />
              <span className="cart-label">Cart</span>
              <span className="cart-count">{cartCount}</span>
            </button>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="mobile-nav-link"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>

      <Outlet />

      <div className={cartDrawerOpen ? 'drawer-scrim open' : 'drawer-scrim'} onClick={closeCartDrawer} />
      <aside className={cartDrawerOpen ? 'cart-drawer open' : 'cart-drawer'} aria-hidden={!cartDrawerOpen}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow">Cart Sync</span>
            <h2>Drop Bag</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close cart drawer" onClick={closeCartDrawer}>
            <X size={18} />
          </button>
        </div>
        <div className="drawer-items">
          {cart.length === 0 ? (
            <div className="drawer-empty">
              <ShoppingBag size={28} />
              <p>Your tactical kit is empty.</p>
            </div>
          ) : (
            cart.map((item, index) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <article className="drawer-item" key={`${item.productId}-${item.color}-${item.size}-${index}`}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <span>{item.color} / {item.size}</span>
                    <strong>{formatCurrency(product.price * item.quantity)}</strong>
                    <div className="drawer-item-actions">
                      <button type="button" aria-label={`Decrease ${product.name}`} onClick={() => updateQuantity(index, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label={`Increase ${product.name}`} onClick={() => updateQuantity(index, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                      <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(index)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
        <div className="drawer-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Link className="button primary" to="/checkout" onClick={closeCartDrawer}>
            Secure Checkout
            <ArrowRight size={16} />
          </Link>
          <Link className="button secondary" to="/cart" onClick={closeCartDrawer}>
            Edit Cart
          </Link>
        </div>
      </aside>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h3>Valoria Supply</h3>
            <p>
              Original tactical FPS-inspired merchandise for competitive gamers, creators,
              and high-intensity desk setups. No official game branding, just pure arena energy.
            </p>
          </div>
          <div>
            <h4>Navigation</h4>
            <Link to="/shop">Shop all</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
          <div>
            <h4>Support</h4>
            <a href="mailto:ops@valoria.store">ops@valoria.store</a>
            <a href="https://wa.me/?text=Hi%20Valoria%20Ops" target="_blank" rel="noreferrer">
              WhatsApp dispatch
            </a>
            <span>Ships across India / EU-ready brand system</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
