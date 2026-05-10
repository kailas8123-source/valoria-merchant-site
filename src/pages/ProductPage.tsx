import { CreditCard, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { formatCurrency, products, shippingThreshold } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../store/ShopContext';

export function ProductPage() {
  const { slug = '' } = useParams();
  const product = products.find((entry) => entry.slug === slug);
  const { addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? '');

  const related = useMemo(
    () => products.filter((entry) => entry.slug !== slug).slice(0, 3),
    [slug],
  );

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="page-shell">
      <div className="product-page-grid">
        <div className="product-visual panel">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-details">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="rating-row">
            <strong>{formatCurrency(product.price)}</strong>
            <span className="product-rating">
              <Star size={14} />
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="panel option-panel">
            <div>
              <span className="field-label">Colour</span>
              <div className="chip-row">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    aria-pressed={selectedColor === color}
                    className={selectedColor === color ? 'chip active-chip' : 'chip'}
                    onClick={() => setSelectedColor(color)}
                    type="button"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="field-label">Size</span>
              <div className="chip-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    aria-pressed={selectedSize === size}
                    className={selectedSize === size ? 'chip active-chip' : 'chip'}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="field-label">Quantity</span>
              <div className="quantity-picker">
                <button
                  aria-label="Decrease quantity"
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  aria-label="Increase quantity"
                  type="button"
                  onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="stack-actions">
              <button
                className="button primary"
                type="button"
                onClick={() =>
                  addToCart({
                    productId: product.id,
                    quantity,
                    color: selectedColor,
                    size: selectedSize,
                  })
                }
              >
                <ShoppingBag size={16} />
                Add To Cart
              </button>
              <Link className="button secondary" to="/checkout">
                <CreditCard size={16} />
                Buy Now
              </Link>
            </div>
          </div>

          <div className="support-grid">
            <div className="panel">
              <Truck size={18} />
              <h3>Shipping</h3>
              <p>Free delivery over {formatCurrency(shippingThreshold)}.</p>
            </div>
            <div className="panel">
              <ShieldCheck size={18} />
              <h3>Protection</h3>
              <p>7-day replacement for wrong or damaged items.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Related Products</span>
            <h2>You May Also Like</h2>
          </div>
        </div>
        <div className="product-grid">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
