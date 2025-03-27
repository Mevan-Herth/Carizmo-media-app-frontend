import { useEffect, useState } from 'react';
import PostList from '../components/Post/PostList';
import PostForm from '../components/Post/PostForm';
import { getPosts, createPost } from '../services/api.js';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        if (!isMounted) return;
        
        const receivedPosts = response?.data?.posts || response?.data || [];
        setPosts(Array.isArray(receivedPosts) ? receivedPosts : []);
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'Failed to fetch posts');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPosts();
    return () => { isMounted = false };
  }, []);

  const handlePostSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await createPost(data);
      setPosts(prev => [response.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="home-page">
      <h1>Home</h1>
      {error && <div className="error">{error}</div>}
      
      <PostForm onSubmit={handlePostSubmit} loading={submitting} />
      
      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default Home;