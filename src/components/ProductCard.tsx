import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, type Product } from '../data/catalog';
import { useShop } from '../store/ShopContext';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, isWishlisted, toggleWishlist } = useShop();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const quickAdd = () =>
    addToCart({
      productId: product.id,
      quantity: 1,
      color: product.colors[0],
      size: product.sizes[0],
    });

  return (
    <>
      <article className="product-card">
        <div className="product-card-image-wrap">
          <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
            <img className="product-card-image" src={product.image} alt={product.name} />
          </Link>
          <span className="product-pill">{product.drop}</span>
          <div className="product-hover-actions">
            <button type="button" aria-label={`Quick view ${product.name}`} onClick={() => setQuickViewOpen(true)}>
              <Eye size={16} />
            </button>
            <button
              type="button"
              aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              aria-pressed={wishlisted}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
        <div className="product-card-body">
          <div className="product-meta-row">
            <div>
              <span className="muted product-category">{product.category}</span>
              <h3>{product.name}</h3>
            </div>
            <span className="product-rating">
              <Star size={14} />
              {product.rating}
            </span>
          </div>
          <p className="product-tagline">{product.tagline}</p>
          <div className="product-meta-row">
            <div>
              <strong>{formatCurrency(product.price)}</strong>
              {product.originalPrice ? (
                <div className="strikethrough">{formatCurrency(product.originalPrice)}</div>
              ) : null}
            </div>
            <button type="button" className="mini-button" onClick={quickAdd}>
              <ShoppingBag size={14} />
              Add
            </button>
          </div>
        </div>
      </article>

      {quickViewOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setQuickViewOpen(false)}>
          <div className="quick-view" role="dialog" aria-modal="true" aria-label={`${product.name} quick view`} onClick={(event) => event.stopPropagation()}>
            <img src={product.image} alt={product.name} />
            <div>
              <span className="eyebrow">{product.category}</span>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <ul>
                {product.bullets.slice(0, 3).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="quick-view-actions">
                <button type="button" className="button primary" onClick={quickAdd}>
                  <ShoppingBag size={16} />
                  Add To Cart
                </button>
                <Link className="button secondary" to={`/product/${product.slug}`}>
                  Full Details
                </Link>
              </div>
            </div>
            <button className="modal-close" type="button" onClick={() => setQuickViewOpen(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
