import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts, searchProducts } from '../api/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) { fetchProducts(); return; }
    setLoading(true);
    searchProducts(search)
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>All Products</h1>

      <form onSubmit={handleSearch} style={styles.searchBar}>
        <input
          style={styles.input}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit" style={styles.searchBtn}>Search</button>
        {search && (
          <button type="button" style={styles.clearBtn} onClick={() => { setSearch(''); fetchProducts(); }}>
            Clear
          </button>
        )}
      </form>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '60px' }}>Loading...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '60px' }}>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' },
  title: { fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px' },
  searchBar: { display: 'flex', gap: '10px', marginBottom: '32px' },
  input: {
    flex: 1, padding: '12px 16px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '15px', outline: 'none'
  },
  searchBtn: {
    backgroundColor: '#2e7d32', color: 'white', border: 'none',
    padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
  },
  clearBtn: {
    backgroundColor: '#eee', color: '#333', border: 'none',
    padding: '12px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px'
  }
};

export default ProductsPage;
