import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.brand} onClick={() => navigate('/')}>
        🛒 FreshMart
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/orders" style={styles.link}>My Orders</Link>
        <Link to="/cart" style={styles.cartBtn}>
          🛍️ Cart {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 32px', backgroundColor: '#2e7d32', color: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)', position: 'sticky', top: 0, zIndex: 100
  },
  brand: {
    fontSize: '22px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px'
  },
  links: { display: 'flex', alignItems: 'center', gap: '24px' },
  link: { color: 'white', textDecoration: 'none', fontSize: '15px', fontWeight: '500' },
  cartBtn: {
    position: 'relative', color: 'white', textDecoration: 'none',
    backgroundColor: '#1b5e20', padding: '8px 16px', borderRadius: '20px',
    fontSize: '15px', fontWeight: '600'
  },
  badge: {
    backgroundColor: '#ff5722', color: 'white', borderRadius: '50%',
    padding: '1px 6px', fontSize: '11px', marginLeft: '4px'
  }
};

export default Navbar;
