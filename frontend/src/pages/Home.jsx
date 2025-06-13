import React from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import LogoutButton from '../components/LogoutButton';

const Home = () => (
  <div style={styles.container}>
    <div style={styles.headerRow}>
      <h1 style={styles.header}>📝 Mini Blog</h1>
      <LogoutButton />
    </div>
    <PostForm />
    <PostList />
  </div>
);

const styles = {
  container: {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  header: {
    margin: 0,
    color: '#333',
  },
};

export default Home;
