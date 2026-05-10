import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, products, shippingThreshold } from '../data/catalog';
import { useShop } from '../store/ShopContext';

export function CartPage() {
  const { cart, removeFromCart, subtotal, updateQuantity } = useShop();
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  return (
    <main className="page-shell">
      <div className="page-head">
        <span className="eyebrow">Cart</span>
        <h1>Your Loadout</h1>
      </div>
      <div className="cart-layout">
        <section className="cart-items">
          {cart.length === 0 ? (
            <div className="panel empty-state">
              <h2>Your cart is empty</h2>
              <p>Add products from the catalog to continue.</p>
              <Link className="button primary" to="/shop">
                <ShoppingBag size={16} />
                Browse Products
              </Link>
            </div>
          ) : (
            cart.map((item, index) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <article className="cart-card" key={`${item.productId}-${item.color}-${item.size}-${index}`}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <span className="muted">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p className="muted">Colour: {item.color} / Size: {item.size}</p>
                    <strong>{formatCurrency(product.price)}</strong>
                  </div>
                  <div className="cart-controls">
                    <div className="quantity-picker">
                      <button
                        aria-label={`Decrease quantity for ${product.name}`}
                        type="button"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Increase quantity for ${product.name}`}
                        type="button"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${product.name} from cart`}
                      className="remove-button"
                      type="button"
                      onClick={() => removeFromCart(index)}
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>

        <aside className="panel summary-panel">
          <h2>Order Summary</h2>
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
          <Link className="button primary" to="/checkout">
            Proceed To Checkout
            <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
    </main>
  );
}
