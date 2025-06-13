import React from 'react';
import { Link } from 'react-router-dom';

const Splash = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>Welcome to Mini Blog</h1>
    <p style={styles.tagline}>Write. Share. Inspire.</p>
    <div style={styles.links}>
      <Link to="/login" style={styles.button}>Login</Link>
      <Link to="/signup" style={{ ...styles.button, backgroundColor: '#a883f3' }}>Sign Up</Link>
    </div>
  </div>
);

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #f4f0fa, #e7f1ff)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '3rem',
    color: '#6c63ff',
    marginBottom: '10px',
  },
  tagline: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '30px',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    textDecoration: 'none',
    backgroundColor: '#6c63ff',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default Splash;
