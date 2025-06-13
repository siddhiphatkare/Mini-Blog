import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p style={styles.state}>Loading...</p>;
  if (error) return <p style={styles.state}>Error: {error}</p>;
  if (!post) return <p style={styles.state}>Post not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>
          {post.title}
          {post.isEdited && <span style={styles.edited}> (edited)</span>}
        </h2>
        <p style={styles.content}>{post.content}</p>
        <p style={styles.meta}>
          {post.isEdited && post.updatedAt
            ? `Last edited: ${new Date(post.updatedAt).toLocaleString()}`
            : `Created: ${new Date(post.createdAt).toLocaleString()}`}
        </p>

        {post.history && post.history.length > 0 && (
          <div style={styles.historyBlock}>
            <h4 style={styles.historyTitle}>Edit History</h4>
            <ul style={styles.historyList}>
              {post.history.map((entry, index) => (
                <li key={index} style={styles.historyItem}>
                  {new Date(entry.editedAt).toLocaleString()} by{' '}
                  {entry.editedBy?.name || 'Unknown'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  content: {
    margin: '20px 0',
    fontSize: '1.1rem',
    color: '#444',
  },
  meta: {
    fontSize: '0.85rem',
    color: '#999',
  },
  edited: {
    fontSize: '0.9rem',
    color: '#999',
    marginLeft: '8px',
  },
  state: {
    textAlign: 'center',
    color: '#777',
    padding: '40px',
  },
  historyBlock: {
    marginTop: '30px',
  },
  historyTitle: {
    color: '#888',
    fontSize: '1rem',
    marginBottom: '10px',
  },
  historyList: {
    paddingLeft: '20px',
  },
  historyItem: {
    fontSize: '0.85rem',
    color: '#555',
    marginBottom: '6px',
  },
};

export default PostDetail;
