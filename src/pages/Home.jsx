import { useEffect, useState } from 'react';
import PostList from '../components/Post/PostList';
import PostForm from '../components/Post/PostForm';
import { getPosts, createPost } from '../services/api.js';
import UserSearch from '../components/UserSearch.jsx';


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
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    {/* Page Header */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Welcome to Your Feed
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
        Share your thoughts with the community
      </p>

      <div className="mt-8">
        <UserSearch />
      </div>
      
    </div>
  
    {/* Error Message */}
    {error && (
      <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">{error}</p>
        </div>
      </div>
    )}
  
    {/* Post Form */}
    <div className="mb-10 bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all duration-300 hover:shadow-lg">
      <PostForm onSubmit={handlePostSubmit} loading={submitting} />
    </div>
  
    {/* Posts Loading State */}
    {loading ? (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-600">Loading posts...</p>
      </div>
    ) : (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Recent Posts
        </h2>
        <PostList posts={posts} />
      </div>
    )}
  </div>
  );
}

export default Home;