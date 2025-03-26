import { useEffect, useState } from 'react';
import PostList from '../components/Post/PostList';
import PostForm from '../components/Post/PostForm';
import { getPosts, createPost } from '../services/api';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      setPosts(response.data.posts);
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async (data) => {
    const response = await createPost(data);
    setPosts([response.data, ...posts]);
  };

  return (
    <div>
      <h1>Home</h1>
      <PostForm onSubmit={handlePostSubmit} />
      <PostList posts={posts} />
    </div>
  );
}

export default Home;