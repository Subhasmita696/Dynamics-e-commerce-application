import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={{ fontSize: '64px' }}>🛒</div>
        <h2>Your cart is empty</h2>
        <button style={styles.shopBtn} onClick={() => navigate('/products')}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Your Cart</h1>
      <div style={styles.layout}>
        <div style={styles.items}>
          {items.map(({ product, quantity }) => (
            <div key={product.id} style={styles.item}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/80'}
                alt={product.name}
                style={styles.img}
              />
              <div style={styles.info}>
                <h3 style={styles.name}>{product.name}</h3>
                <p style={styles.unitPrice}>${Number(product.price).toFixed(2)} / {product.unit}</p>
              </div>
              <div style={styles.qtyControl}>
                <button style={styles.qtyBtn} onClick={() => quantity > 1 ? updateQuantity(product.id, quantity - 1) : removeFromCart(product.id)}>−</button>
                <span style={styles.qty}>{quantity}</span>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
              </div>
              <span style={styles.subtotal}>${(product.price * quantity).toFixed(2)}</span>
              <button style={styles.removeBtn} onClick={() => removeFromCart(product.id)}>✕</button>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Delivery</span><span style={{ color: '#2e7d32' }}>Free</span>
          </div>
          <hr style={{ margin: '16px 0', border: '1px solid #eee' }} />
          <div style={{ ...styles.summaryRow, fontWeight: '700', fontSize: '18px' }}>
            <span>Total</span><span>${totalPrice.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutBtn} onClick={() => navigate('/checkout')}>
            Proceed to Checkout →
          </button>
          <button style={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' },
  title: { fontSize: '28px', fontWeight: '700', marginBottom: '28px' },
  layout: { display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' },
  items: { flex: 2, display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' },
  item: {
    display: 'flex', alignItems: 'center', gap: '16px',
    backgroundColor: 'white', padding: '16px', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  img: { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' },
  info: { flex: 1 },
  name: { margin: '0 0 4px', fontSize: '15px', fontWeight: '600' },
  unitPrice: { margin: 0, color: '#888', fontSize: '13px' },
  qtyControl: { display: 'flex', alignItems: 'center', gap: '10px' },
  qtyBtn: {
    width: '28px', height: '28px', border: '1px solid #ddd', borderRadius: '50%',
    cursor: 'pointer', background: '#f5f5f5', fontWeight: '700', fontSize: '16px'
  },
  qty: { fontWeight: '700', fontSize: '15px' },
  subtotal: { fontWeight: '700', fontSize: '15px', minWidth: '60px', textAlign: 'right' },
  removeBtn: {
    background: 'none', border: 'none', color: '#aaa', fontSize: '18px',
    cursor: 'pointer', padding: '4px'
  },
  summary: {
    flex: 1, backgroundColor: 'white', padding: '24px', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: '260px'
  },
  summaryTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '16px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '15px' },
  checkoutBtn: {
    width: '100%', backgroundColor: '#2e7d32', color: 'white', border: 'none',
    padding: '14px', borderRadius: '8px', fontWeight: '700', fontSize: '16px',
    cursor: 'pointer', marginTop: '16px'
  },
  clearBtn: {
    width: '100%', backgroundColor: '#fff', color: '#e53935', border: '1px solid #e53935',
    padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '14px',
    cursor: 'pointer', marginTop: '10px'
  },
  empty: { textAlign: 'center', padding: '80px 24px', color: '#555' },
  shopBtn: {
    backgroundColor: '#2e7d32', color: 'white', border: 'none',
    padding: '14px 32px', borderRadius: '30px', fontSize: '16px',
    fontWeight: '600', cursor: 'pointer', marginTop: '16px'
  }
};

export default CartPage;
