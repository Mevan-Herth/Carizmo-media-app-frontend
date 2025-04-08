import PostItem from './PostItem';
import PropTypes from 'prop-types';

function PostList({ posts, loading, error }) {
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen text-xl text-gray-600 bg-gray-100">
      Loading posts...
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen text-xl text-red-600 bg-gray-100">
      Error: {error.message}
    </div>
  );

  if (!posts || posts.length === 0) return (
    <div className="flex items-center justify-center min-h-screen text-xl text-gray-600 bg-gray-100">
      No posts available
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default PostList;