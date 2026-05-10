import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useShop } from '../store/ShopContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Checkout', to: '/checkout' }
];

export function AppShell() {
  const { cartCount } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/">
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
            <Link
              className="cart-link"
              to="/cart"
              aria-label={`Cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            >
              <ShoppingBag size={16} />
              <span className="cart-label">Cart</span>
              <span className="cart-count">{cartCount}</span>
            </Link>
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

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h3>Valoria Merchant Site</h3>
            <p>
              A fully deployable esports-inspired storefront with mobile-first shopping,
              persistent cart, and checkout UX.
            </p>
          </div>
          <div>
            <h4>Store</h4>
            <Link to="/shop">Shop all</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
          <div>
            <h4>Support</h4>
            <a href="mailto:ops@valoria.store">ops@valoria.store</a>
            <a href="https://wa.me/?text=Hi%20Valoria%20Ops" target="_blank" rel="noreferrer">
              WhatsApp support
            </a>
            <span>Ships across India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
