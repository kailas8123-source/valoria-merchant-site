import {
  ArrowRight,
  BadgeCheck,
  Box,
  Clock3,
  Crosshair,
  Flame,
  MessageCircle,
  Radar,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, formatCurrency, products, shippingThreshold, testimonials } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  const featured = products.filter((product) => product.featured);
  const bundles = products.filter((product) => product.bundle);
  const categoryCards = categories.map((category) => ({
    category,
    count: products.filter((product) => product.category === category).length,
  }));

  return (
    <main>
      <section className="hero-section">
        <div className="particle-field" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="hero-grid">
          <div className="hero-copy-block">
            <span className="eyebrow">Original Tactical Drops</span>
            <h1>
              Valoria
              <span>Supply Protocol</span>
            </h1>
            <p className="hero-copy">
              High-end gaming merchandise for competitive players, creators, and desk setups.
              Dark cinematic apparel, neon-accent accessories, and limited drops without using
              any official game assets or copyrighted visuals.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="button primary">
                <ShoppingBag size={16} />
                Shop The Drop
              </Link>
              <Link to="/shop" className="button secondary">
                <Radar size={16} />
                Explore Loadouts
              </Link>
            </div>
            <div className="hero-stat-grid">
              <div>
                <strong>07</strong>
                <span>Launch SKUs</span>
              </div>
              <div>
                <strong>48H</strong>
                <span>Limited window</span>
              </div>
              <div>
                <strong>4.8</strong>
                <span>Community rating</span>
              </div>
            </div>
          </div>
          <div className="hero-command-panel" aria-label="Featured drop preview">
            <div className="command-frame">
              <div className="scanline" />
              <Crosshair className="command-reticle" size={92} />
              <span className="command-tag">DROP LIVE</span>
              <h2>Night Ops Capsule</h2>
              <p>Apparel, desk gear, posters, and creator kits with original cyber-tactical art direction.</p>
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
        </div>
      </section>

      <section className="feature-strip">
        {[
          {
            icon: ShieldCheck,
            title: 'Original Identity',
            text: 'Esports mood and tactical UI energy without official game assets.'
          },
          {
            icon: Truck,
            title: `Free shipping over ${formatCurrency(shippingThreshold)}`,
            text: 'Conversion-ready cart, checkout, and order confirmation flow.'
          },
          {
            icon: Zap,
            title: 'Fast Drop UX',
            text: 'Quick view, wishlist, animated cart drawer, search, and filters.'
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
            <span className="eyebrow">Featured Drops</span>
            <h2>Limited Gear Rotation</h2>
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

      <section className="section-block category-band">
        <div className="section-head">
          <div>
            <span className="eyebrow">Gaming Categories</span>
            <h2>Build Your Loadout</h2>
          </div>
        </div>
        <div className="category-grid">
          {categoryCards.map((item, index) => {
            const icons = [Flame, Box, Sparkles, BadgeCheck];
            const Icon = icons[index] ?? Crosshair;
            return (
              <Link to="/shop" className="category-tile" key={item.category}>
                <Icon size={24} />
                <span>{item.count} SKUs</span>
                <h3>{item.category}</h3>
                <p>Original tactical styling for a premium competitive setup.</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-block bundle-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Bundles</span>
            <h2>Creator Command Kits</h2>
          </div>
        </div>
        <div className="bundle-grid">
          <div className="bundle-copy panel">
            <Clock3 size={22} />
            <h3>Launch window closes soon</h3>
            <div className="countdown-grid" aria-label="Limited drop countdown">
              <div><strong>01</strong><span>Days</span></div>
              <div><strong>17</strong><span>Hours</span></div>
              <div><strong>42</strong><span>Minutes</span></div>
            </div>
            <p>Push urgency without fake scarcity: a polished countdown module ready to connect to live inventory or campaign timing.</p>
            <Link to="/shop" className="button secondary">
              View Bundles
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid bundle-products">
            {bundles.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block section-light">
        <div className="section-head">
          <div>
            <span className="eyebrow dark">Community Reviews</span>
            <h2 className="dark-text">Trusted By The Queue</h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <MessageCircle size={20} />
              <p>{testimonial.quote}</p>
              <h3>{testimonial.name}</h3>
              <span>{testimonial.role}</span>
            </article>
          ))}
        </div>
      </section>

      <Link className="floating-cta" to="/shop">
        <ShoppingBag size={16} />
        Shop Drop
      </Link>
    </main>
  );
}
