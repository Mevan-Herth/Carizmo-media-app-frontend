import PostItem from './PostItem';
import PropTypes from 'prop-types';

function PostList({ posts, loading, error }) {
  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!posts || posts.length === 0) return <div className="empty">No posts available</div>;

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object
};

export default PostList;