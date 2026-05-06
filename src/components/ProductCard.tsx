import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, type Product } from '../data/catalog';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card-image-wrap">
        <img className="product-card-image" src={product.image} alt={product.name} />
        <span className="product-pill">{product.category}</span>
      </Link>
      <div className="product-card-body">
        <div className="product-meta-row">
          <h3>{product.name}</h3>
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
          <Link to={`/product/${product.slug}`} className="mini-button">
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
