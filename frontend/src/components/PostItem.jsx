import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from '../context/PostContext';

const PostItem = ({ post }) => {
  const { fetchPosts } = useContext(PostContext);
  const [loading, setLoading] = useState(false);

  if (!post || typeof post !== 'object' || !post.title || !post.content || !post._id) {
    return null;
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setLoading(true);
      try {
        await fetch(`http://localhost:5000/api/posts/${post._id}`, {
          method: 'DELETE',
        });
        fetchPosts();
      } catch (error) {
        alert('Failed to delete post');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={styles.card}>
      <h3>
        {post.title}
        {post.isEdited && <span style={styles.edited}> (edited)</span>}
      </h3>
      <p style={styles.content}>
        {post.content.length > 120 ? `${post.content.slice(0, 120)}...` : post.content}
      </p>
      <p style={styles.meta}>
        {post.isEdited && post.updatedAt
          ? `Last edited: ${new Date(post.updatedAt).toLocaleString()}`
          : `Created: ${new Date(post.createdAt).toLocaleString()}`}
      </p>
      <div style={styles.actions}>
        <Link to={`/posts/${post._id}`} style={styles.link}>Read more →</Link>
        <Link to={`/edit/${post._id}`} style={styles.editBtn}>Edit</Link>
        <button
          onClick={handleDelete}
          style={styles.deleteBtn}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    padding: '15px 20px',
    marginBottom: '15px',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
  },
  content: {
    color: '#555',
    fontSize: '0.95rem',
    margin: '10px 0',
  },
  meta: {
    fontSize: '0.8rem',
    color: '#999',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  deleteBtn: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editBtn: {
    background: '#ffc107',
    color: '#000',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  edited: {
    fontSize: '0.85rem',
    color: '#999',
    marginLeft: '8px',
  },
};

export default PostItem;
