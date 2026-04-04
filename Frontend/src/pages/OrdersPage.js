import React, { useEffect, useState } from 'react';
import { getOrdersByUser } from '../api/api';

const STATUS_COLORS = {
  PENDING: '#f57c00',
  CONFIRMED: '#1565c0',
  SHIPPED: '#6a1b9a',
  DELIVERED: '#2e7d32',
  CANCELLED: '#c62828'
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersByUser(1)  // hardcoded userId=1 for demo
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '60px', color: '#888' }}>Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px', color: '#555' }}>
        <div style={{ fontSize: '64px' }}>📦</div>
        <h2>No orders yet</h2>
        <p>Your orders will appear here once you place one.</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My Orders</h1>
      <div style={styles.list}>
        {orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <span style={styles.orderId}>Order #{order.id}</span>
                <span style={{ marginLeft: '12px', fontSize: '13px', color: '#888' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <span style={{ ...styles.badge, backgroundColor: STATUS_COLORS[order.status] }}>
                {order.status}
              </span>
            </div>
            <div style={styles.itemList}>
              {order.orderItems?.map(item => (
                <div key={item.id} style={styles.orderItem}>
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={styles.cardFooter}>
              <span style={{ color: '#555', fontSize: '13px' }}>📍 {order.deliveryAddress}</span>
              <span style={styles.total}>Total: ${Number(order.totalAmount).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: { maxWidth: '800px', margin: '0 auto', padding: '40px 24px' },
  title: { fontSize: '28px', fontWeight: '700', marginBottom: '28px' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: {
    backgroundColor: 'white', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden'
  },
  cardHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 20px', borderBottom: '1px solid #f0f0f0'
  },
  orderId: { fontWeight: '700', fontSize: '16px' },
  badge: {
    color: 'white', padding: '4px 12px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px'
  },
  itemList: { padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: '8px' },
  orderItem: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#444' },
  cardFooter: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 20px', backgroundColor: '#f9f9f9', borderTop: '1px solid #f0f0f0'
  },
  total: { fontWeight: '700', fontSize: '16px', color: '#2e7d32' }
};

export default OrdersPage;
