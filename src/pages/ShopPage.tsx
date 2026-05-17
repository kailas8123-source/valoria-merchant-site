import { useMemo, useState } from 'react';
import { categories, products } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

export function ShopPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | (typeof categories)[number]>('All');
  const [onlyBundles, setOnlyBundles] = useState(false);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = category === 'All' || product.category === category;
        const matchesQuery = `${product.name} ${product.category} ${product.tagline}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesBundle = !onlyBundles || product.bundle;
        return matchesCategory && matchesQuery && matchesBundle;
      }),
    [category, onlyBundles, query],
  );

  return (
    <main className="page-shell">
      <div className="page-head">
        <span className="eyebrow">Drop Catalog</span>
        <h1>Shop Tactical Gear</h1>
        <p>Search limited apparel, desk accessories, posters, stickers, and creator bundles.</p>
      </div>
      <div className="filter-grid">
        <label className="panel">
          <span className="field-label">Search</span>
          <input
            className="field-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tees, hoodies, mousepads..."
          />
        </label>
        <label className="panel">
          <span className="field-label">Category</span>
          <select
            className="field-input"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as 'All' | (typeof categories)[number])
            }
          >
            <option value="All">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="panel toggle-panel">
          <span className="field-label">Bundle Filter</span>
          <span className="toggle-row">
            Creator bundles only
            <input
              checked={onlyBundles}
              onChange={(event) => setOnlyBundles(event.target.checked)}
              type="checkbox"
            />
          </span>
        </label>
      </div>
      <div className="catalog-status">
        <span>{filteredProducts.length} products found</span>
        <span>Quick view, wishlist, and fast add are active</span>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
