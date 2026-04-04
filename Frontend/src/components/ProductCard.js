import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <img
        src={product.imageUrl || 'https://via.placeholder.com/200x150?text=Product'}
        alt={product.name}
        style={styles.image}
      />
      <div style={styles.body}>
        <span style={styles.category}>{product.category?.name}</span>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.desc}>{product.description}</p>
        <div style={styles.footer}>
          <div>
            <span style={styles.price}>${Number(product.price).toFixed(2)}</span>
            <span style={styles.unit}> / {product.unit}</span>
          </div>
          <button
            style={product.stockQuantity > 0 ? styles.btn : styles.btnDisabled}
            onClick={() => addToCart(product)}
            disabled={product.stockQuantity === 0}
          >
            {product.stockQuantity > 0 ? '+ Add' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff', transition: 'transform 0.2s',
    display: 'flex', flexDirection: 'column'
  },
  image: { width: '100%', height: '160px', objectFit: 'cover' },
  body: { padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
  category: {
    fontSize: '11px', color: '#2e7d32', fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: '0.5px'
  },
  name: { margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a1a1a' },
  desc: { margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.4' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px' },
  price: { fontSize: '18px', fontWeight: '700', color: '#2e7d32' },
  unit: { fontSize: '12px', color: '#888' },
  btn: {
    backgroundColor: '#2e7d32', color: 'white', border: 'none',
    borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
  },
  btnDisabled: {
    backgroundColor: '#ccc', color: '#666', border: 'none',
    borderRadius: '8px', padding: '8px 14px', cursor: 'not-allowed', fontWeight: '600', fontSize: '13px'
  }
};

export default ProductCard;
