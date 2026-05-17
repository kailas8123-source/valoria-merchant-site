import { ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OrderSuccessPage() {
  return (
    <main className="page-shell">
      <div className="panel success-panel">
        <CheckCircle2 size={56} />
        <h1>Drop Secured</h1>
        <p>
          Your Valoria order is locked in. The storefront is ready for payment gateway,
          inventory, and fulfillment integrations.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/shop">
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
          <Link className="button secondary" to="/">
            <ArrowLeft size={16} />
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
