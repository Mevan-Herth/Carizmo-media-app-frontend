import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComments, createComment } from '../services/api.js'; 

function Post({ post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(post._id);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Failed to fetch comments:', error.response?.data);
      }
    };
    fetchComments();
  }, [post._id]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment({
        postId: post._id,
        content: newComment,
      });
      setComments([...comments, response.data.comment]);
      setNewComment(''); // Clear the input
    } catch (error) {
      console.error('Failed to add comment:', error.response?.data);
    }
  };

  // Navigate to the post detail page
  const handlePostClick = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      {/* Post Content */}
      <h3 onClick={handlePostClick} style={{ cursor: 'pointer', color: 'blue' }}>
        {post.title}
      </h3>
      <p>{post.content}</p>
      <p>Posted by: {post.author?.username || 'Unknown'}</p>
      <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>

      {/* Comments Section */}
      <div>
        <h4>Comments</h4>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} style={{ marginLeft: '20px' }}>
              <p>{comment.content}</p>
              <p>By: {comment.author?.username || 'Unknown'}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
          style={{ width: '100%', height: '60px', margin: '10px 0' }}
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default Post;