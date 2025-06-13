import React, { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import PostItem from './PostItem';

const PostList = () => {
  const { posts, loading, error } = useContext(PostContext);

  if (loading) return <p style={styles.state}>Loading...</p>;
  if (error) return <p style={styles.state}>{error}</p>;

 return (
  <div>
    {Array.isArray(posts) && posts.length > 0 ? (
      posts
        .filter(
          (p) =>
            p &&
            typeof p === 'object' &&
            p._id &&
            p.title &&
            p.content
        )
        .map((post) => <PostItem key={post._id} post={post} />)
    ) : (
      <p style={styles.state}>No posts available.</p>
    )}
  </div>
);
};

const styles = {
  state: {
    textAlign: 'center',
    color: '#777',
    padding: '20px',
  },
};

export default PostList;
