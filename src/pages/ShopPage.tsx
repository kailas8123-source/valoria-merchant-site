import { useMemo, useState } from 'react';
import { categories, products } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

export function ShopPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | (typeof categories)[number]>('All');

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = category === 'All' || product.category === category;
        const matchesQuery = `${product.name} ${product.category} ${product.tagline}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    [category, query],
  );

  return (
    <main className="page-shell">
      <div className="page-head">
        <span className="eyebrow">Catalog</span>
        <h1>Shop All Products</h1>
        <p>Search and filter the full catalog like a real storefront.</p>
      </div>
      <div className="filter-grid">
        <label className="panel">
          <span className="field-label">Search</span>
          <input
            className="field-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
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
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
