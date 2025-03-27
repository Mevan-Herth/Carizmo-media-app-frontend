import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/Comment/CommentList';
import CommentForm from '../components/Comment/CommentForm';
import { getPost, getComments, createComment } from '../services/api.js';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postResponse, commentsResponse] = await Promise.all([
          getPost(id),
          getComments(id)
        ]);
        
        if (!isMounted) return;
        
        setPost(postResponse.data?.post || null);
        setComments(Array.isArray(commentsResponse.data) ? commentsResponse.data : []);
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'Failed to fetch post');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false };
  }, [id]);

  const handleCommentSubmit = async (content) => {
    try {
      setCommentLoading(true);
      const response = await createComment({ postId: id, content });
      setComments(prevComments => [response.data, ...prevComments]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!post) return <div className="not-found">Post not found</div>;

  return (
    <div className="post-page">
      <article className="post-content">
        <h1>{post.title}</h1>
        <p className="post-text">{post.mainText || post.content || 'No content available'}</p>
        {post.createdAt && (
          <small className="post-date">
            Posted on: {new Date(post.createdAt).toLocaleString()}
          </small>
        )}
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>
        <CommentForm onSubmit={handleCommentSubmit} loading={commentLoading} />
        <CommentList comments={comments} />
      </section>
    </div>
  );
}

export default PostPage;