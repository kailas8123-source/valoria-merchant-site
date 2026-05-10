import { ArrowRight, CreditCard, ShieldCheck, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, products, shippingThreshold, testimonials } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  const featured = products.filter((product) => product.featured);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Deployable Ecommerce</span>
            <h1>
              Valoria Merchant Site
              <span>Built To Ship</span>
            </h1>
            <p className="hero-copy">
              A polished mobile-friendly storefront with catalog, product pages, cart,
              checkout, and order confirmation flow for a Valoria gaming merchandise brand.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="button primary">
                <ShoppingBag size={16} />
                Start Shopping
              </Link>
              <Link to="/checkout" className="button secondary">
                <CreditCard size={16} />
                View Checkout
              </Link>
            </div>
          </div>
          <div className="hero-highlight-grid">
            {featured.map((product) => (
              <div className="hero-highlight-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <span className="muted">{product.category}</span>
                  <h3>{product.name}</h3>
                  <strong>{formatCurrency(product.price)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-strip">
        {[
          {
            icon: ShieldCheck,
            title: 'Checkout ready',
            text: 'Production-style purchase flow ready for payment integration.'
          },
          {
            icon: Truck,
            title: `Free shipping over ${formatCurrency(shippingThreshold)}`,
            text: 'Shipping logic is already built into the cart and checkout.'
          },
          {
            icon: Sparkles,
            title: 'Mobile optimized',
            text: 'Designed to feel strong on phones, tablets, and desktop.'
          }
        ].map((item) => (
          <div className="feature-card" key={item.title}>
            <item.icon size={22} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Featured Products</span>
            <h2>Best Sellers</h2>
          </div>
          <Link to="/shop" className="inline-link">
            View full catalog
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-block section-light">
        <div className="section-head">
          <div>
            <span className="eyebrow dark">Testimonials</span>
            <h2 className="dark-text">Storefront Confidence</h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <p>{testimonial.quote}</p>
              <h3>{testimonial.name}</h3>
              <span>{testimonial.role}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
