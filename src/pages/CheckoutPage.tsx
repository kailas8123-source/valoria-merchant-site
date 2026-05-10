import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency, products, shippingThreshold } from '../data/catalog';
import { useShop } from '../store/ShopContext';

export function CheckoutPage() {
  const { cart, checkoutDraft, clearCart, subtotal, updateCheckoutDraft } = useShop();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 199;
  const discount = coupon.trim().toUpperCase() === 'VALORIA10' ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const rows = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product ? { item, product } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.length === 0) return;
    clearCart();
    navigate('/order-success');
  };

  if (cart.length === 0) {
    return (
      <main className="page-shell">
        <div className="panel empty-state">
          <h2>No items ready for checkout</h2>
          <p>Add products to the cart before continuing.</p>
          <Link className="button primary" to="/shop">
            <ShoppingBag size={16} />
            Go To Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="page-head">
        <span className="eyebrow">Checkout</span>
        <h1>Complete Your Order</h1>
      </div>
      <form className="checkout-layout" onSubmit={onSubmit}>
        <section className="checkout-form-stack">
          <div className="panel">
            <h2>Customer Details</h2>
            <div className="field-grid">
              {[
                ['name', 'Full Name', 'text'],
                ['email', 'Email', 'email'],
                ['phone', 'Phone', 'tel'],
                ['postalCode', 'Postal Code', 'text']
              ].map(([key, label, type]) => (
                <label key={key}>
                  <span className="field-label">{label}</span>
                  <input
                    className="field-input"
                    required
                    type={type}
                    value={checkoutDraft[key as keyof typeof checkoutDraft] as string}
                    onChange={(event) =>
                      updateCheckoutDraft({ [key]: event.target.value } as Partial<typeof checkoutDraft>)
                    }
                  />
                </label>
              ))}
              <label className="full-width">
                <span className="field-label">Address</span>
                <input
                  className="field-input"
                  required
                  value={checkoutDraft.address}
                  onChange={(event) => updateCheckoutDraft({ address: event.target.value })}
                />
              </label>
              <label>
                <span className="field-label">City</span>
                <input
                  className="field-input"
                  required
                  value={checkoutDraft.city}
                  onChange={(event) => updateCheckoutDraft({ city: event.target.value })}
                />
              </label>
              <label>
                <span className="field-label">State</span>
                <input
                  className="field-input"
                  required
                  value={checkoutDraft.state}
                  onChange={(event) => updateCheckoutDraft({ state: event.target.value })}
                />
              </label>
            </div>
          </div>

          <div className="panel">
            <h2>Payment Method</h2>
            <div className="payment-stack">
              {(['UPI', 'Card', 'Cash on Delivery'] as const).map((method) => (
                <label className="payment-option" key={method}>
                  <span>{method}</span>
                  <input
                    checked={checkoutDraft.paymentMethod === method}
                    name="paymentMethod"
                    onChange={() => updateCheckoutDraft({ paymentMethod: method })}
                    type="radio"
                  />
                </label>
              ))}
            </div>
          </div>
        </section>

        <aside className="panel summary-panel">
          <h2>Review Order</h2>
          <div className="review-stack">
            {rows.map((row) =>
              row ? (
                <div className="summary-row" key={`${row.item.productId}-${row.item.color}-${row.item.size}`}>
                  <div>
                    <strong>{row.product.name}</strong>
                    <div className="muted">
                      {row.item.color} / {row.item.size} / Qty {row.item.quantity}
                    </div>
                  </div>
                  <span>{formatCurrency(row.product.price * row.item.quantity)}</span>
                </div>
              ) : null,
            )}
          </div>
          <label>
            <span className="field-label">Coupon Code</span>
            <input
              className="field-input"
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              placeholder="Try VALORIA10"
            />
          </label>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <button className="button primary" type="submit">
            <CheckCircle2 size={16} />
            Place Order
          </button>
        </aside>
      </form>
    </main>
  );
}
