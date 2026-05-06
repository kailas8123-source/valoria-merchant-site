import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OrderSuccessPage() {
  return (
    <main className="page-shell">
      <div className="panel success-panel">
        <CheckCircle2 size={56} />
        <h1>Order Confirmed</h1>
        <p>
          The Valoria merchant site now has a complete customer journey from catalog to
          order confirmation and is ready for payment gateway integration.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/shop">
            Continue Shopping
          </Link>
          <Link className="button secondary" to="/">
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
