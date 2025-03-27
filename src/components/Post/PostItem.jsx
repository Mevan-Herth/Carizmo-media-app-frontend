import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PostItem({ post }) {
  if (!post) return null;

  return (
    <div className="post-item">
      <Link to={`/post/${post._id}`}>
        <h2 className="post-title">{post.title || 'Untitled Post'}</h2>
      </Link>
      <p className="post-content">
        {post.mainText || post.content || 'No content available'}
      </p>
      {post.createdAt && (
        <small className="post-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </small>
      )}
    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    mainText: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string
  })
};

export default PostItem;