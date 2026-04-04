import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data.slice(0, 6)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Fresh Groceries Delivered 🥦</h1>
        <p style={styles.heroSub}>Shop the freshest produce, dairy, meats and more — delivered to your door.</p>
        <button style={styles.heroBtn} onClick={() => navigate('/products')}>
          Shop Now →
        </button>
      </div>

      {/* Featured */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Loading products...</p>
        ) : (
          <div style={styles.grid}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button style={styles.viewAllBtn} onClick={() => navigate('/products')}>
            View All Products
          </button>
        </div>
      </div>

      {/* Categories Banner */}
      <div style={styles.bannerRow}>
        {['🍎 Fruits', '🥛 Dairy', '🥩 Meat', '🥖 Bakery', '🧃 Beverages'].map(cat => (
          <div key={cat} style={styles.bannerItem}>{cat}</div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #2e7d32, #66bb6a)',
    color: 'white', textAlign: 'center', padding: '80px 24px'
  },
  heroTitle: { fontSize: '42px', margin: '0 0 12px', fontWeight: '800' },
  heroSub: { fontSize: '18px', margin: '0 0 28px', opacity: 0.9 },
  heroBtn: {
    backgroundColor: 'white', color: '#2e7d32', border: 'none',
    padding: '14px 32px', borderRadius: '30px', fontSize: '16px',
    fontWeight: '700', cursor: 'pointer'
  },
  section: { maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' },
  sectionTitle: { fontSize: '26px', fontWeight: '700', color: '#1a1a1a', marginBottom: '28px' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px'
  },
  viewAllBtn: {
    backgroundColor: '#2e7d32', color: 'white', border: 'none',
    padding: '12px 28px', borderRadius: '24px', fontSize: '15px',
    fontWeight: '600', cursor: 'pointer'
  },
  bannerRow: {
    display: 'flex', justifyContent: 'center', gap: '16px',
    padding: '24px', backgroundColor: '#f1f8e9', flexWrap: 'wrap'
  },
  bannerItem: {
    backgroundColor: 'white', padding: '12px 24px', borderRadius: '30px',
    fontSize: '15px', fontWeight: '600', boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
  }
};

export default HomePage;
