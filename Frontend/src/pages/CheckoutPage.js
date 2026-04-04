import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/api';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const orderData = {
      userId: 1, // In a real app this comes from auth context
      deliveryAddress: `${form.name}, ${form.phone}, ${form.address}`,
      items: items.map(({ product, quantity }) => ({
        product: { id: product.id },
        quantity
      }))
    };

    try {
      await createOrder(orderData);
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.successBox}>
        <div style={{ fontSize: '64px' }}>✅</div>
        <h2>Order Placed Successfully!</h2>
        <p>Your fresh groceries are on their way. Thank you for shopping with FreshMart!</p>
        <button style={styles.btn} onClick={() => navigate('/')}>Back to Home</button>
        <button style={{ ...styles.btn, backgroundColor: '#1565c0', marginLeft: '12px' }} onClick={() => navigate('/orders')}>
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Checkout</h1>
      <div style={styles.layout}>
        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.subtitle}>Delivery Details</h2>
          {['name', 'email', 'phone', 'address'].map(field => (
            <div key={field} style={styles.field}>
              <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder={`Enter your ${field}`}
                type={field === 'email' ? 'email' : 'text'}
              />
            </div>
          ))}
          {error && <p style={{ color: '#e53935' }}>{error}</p>}
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Placing Order...' : '🛒 Place Order'}
          </button>
        </form>

        {/* Summary */}
        <div style={styles.summary}>
          <h2 style={styles.subtitle}>Order Summary</h2>
          {items.map(({ product, quantity }) => (
            <div key={product.id} style={styles.summaryItem}>
              <span>{product.name} × {quantity}</span>
              <span>${(product.price * quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr style={{ margin: '16px 0', border: '1px solid #eee' }} />
          <div style={{ ...styles.summaryItem, fontWeight: '700', fontSize: '17px' }}>
            <span>Total</span><span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' },
  title: { fontSize: '28px', fontWeight: '700', marginBottom: '28px' },
  subtitle: { fontSize: '18px', fontWeight: '700', marginBottom: '20px' },
  layout: { display: 'flex', gap: '32px', flexWrap: 'wrap' },
  form: {
    flex: 2, backgroundColor: 'white', padding: '28px', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: '280px'
  },
  field: { marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontWeight: '600', fontSize: '14px', color: '#444' },
  input: {
    padding: '12px', border: '1px solid #ddd', borderRadius: '8px',
    fontSize: '15px', outline: 'none'
  },
  submitBtn: {
    width: '100%', backgroundColor: '#2e7d32', color: 'white', border: 'none',
    padding: '14px', borderRadius: '8px', fontWeight: '700', fontSize: '16px',
    cursor: 'pointer', marginTop: '8px'
  },
  summary: {
    flex: 1, backgroundColor: 'white', padding: '28px', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: '260px', alignSelf: 'flex-start'
  },
  summaryItem: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' },
  successBox: {
    textAlign: 'center', padding: '100px 24px', maxWidth: '600px', margin: '0 auto'
  },
  btn: {
    backgroundColor: '#2e7d32', color: 'white', border: 'none',
    padding: '14px 28px', borderRadius: '8px', fontWeight: '600',
    fontSize: '15px', cursor: 'pointer', marginTop: '16px'
  }
};

export default CheckoutPage;
